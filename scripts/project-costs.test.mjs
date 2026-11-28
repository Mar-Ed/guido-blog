import assert from "node:assert/strict";
import fs from "node:fs";
import Module from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const cache = new Map();

// Compile the actual application modules in memory, without writing generated files.
function load(relativeFile) {
  const filename = path.resolve(root, relativeFile);
  if (cache.has(filename)) return cache.get(filename).exports;
  const loaded = new Module(filename);
  cache.set(filename, loaded);
  loaded.filename = filename;
  loaded.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = (specifier) => {
    if (specifier.startsWith(".")) {
      const target = path.resolve(path.dirname(filename), specifier);
      for (const extension of [".tsx", ".ts"]) {
        if (fs.existsSync(target + extension)) return load(target + extension);
      }
    }
    return originalRequire(specifier);
  };
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  loaded._compile(compiled, filename);
  return loaded.exports;
}

const { estimateProjectCosts, toCents, formatCost } = load("app/lib/project-costs.ts");
const budget = JSON.parse(fs.readFileSync(path.join(root, "app/data/project-costs.json"), "utf8"));
const schedule = JSON.parse(fs.readFileSync(path.join(root, "app/data/project-schedule.json"), "utf8"));

test("base budget reconciles equipment, 132 labor hours, reserve and twelve monthly payments", () => {
  const result = estimateProjectCosts();
  assert.equal(result.totalHours, 132);
  assert.equal(result.materialsCents, 754000);
  assert.equal(result.laborCents, 792000);
  assert.equal(result.directCents, 1546000);
  assert.equal(result.contingencyCents, 154600);
  assert.equal(result.initialCents, 1700600);
  assert.equal(result.monthlyCents, 47300);
  assert.equal(result.annualOperatingCents, 567600);
  assert.equal(result.firstYearCents, 2268200);
});

test("reusing both computers removes only their purchase and corresponding reserve", () => {
  const base = estimateProjectCosts();
  const reuse = estimateProjectCosts({ reuseComputers: true });
  assert.equal(reuse.initialItems.find((item) => item.id === "computers").quantity, 0);
  assert.equal(reuse.initialCents, 1282600);
  assert.equal(reuse.firstYearCents, 1850200);
  assert.equal(base.initialCents - reuse.initialCents, 418000);
  assert.equal(reuse.laborCents, base.laborCents);
  assert.equal(reuse.monthlyCents, base.monthlyCents);
  for (const item of reuse.initialItems.filter((item) => item.id !== "computers")) {
    assert.equal(item.totalCents, base.initialItems.find((original) => original.id === item.id).totalCents);
  }
});

test("reserve applies only to initial direct costs, at every offered percentage", () => {
  const expectedInitial = new Map([[0, 1546000], [10, 1700600], [15, 1777900], [20, 1855200]]);
  for (const [contingencyPercent, initialCents] of expectedInitial) {
    const result = estimateProjectCosts({ contingencyPercent });
    assert.equal(result.initialCents, initialCents);
    assert.equal(result.monthlyCents, 47300);
    assert.equal(result.firstYearCents, initialCents + 567600);
  }
  const fractional = estimateProjectCosts({ contingencyPercent: 12.345 });
  assert.equal(fractional.contingencyCents, 190854);
  assert.ok(Number.isInteger(fractional.firstYearCents));
});

test("all eight schedule phases account for every purchase exactly once", () => {
  const result = estimateProjectCosts();
  const codes = schedule.phases.map((phase) => phase.code);
  assert.deepEqual(result.phases.map((phase) => phase.phase), codes);
  assert.equal(new Set(budget.initialItems.map((item) => item.id)).size, budget.initialItems.length);
  for (const item of budget.initialItems) assert.ok(codes.includes(item.phase), `Unassigned item: ${item.id}`);
  assert.equal(result.phases.reduce((sum, phase) => sum + phase.totalCents, 0), result.directCents);
  assert.equal(result.phases.find((phase) => phase.phase === "1.4").totalCents, 417000);
  assert.equal(result.phases.find((phase) => phase.phase === "1.5").totalCents, 538000);
  assert.equal(result.phases.find((phase) => phase.phase === "1.6").materialsCents, 0);
  for (const item of [...budget.initialItems, ...budget.monthlyItems]) {
    if (item.source) assert.ok(budget.sources.some((source) => source.id === item.source));
  }
});

test("currency rounding handles decimal prices and rejects invalid amounts and reserves", () => {
  assert.equal(toCents(1.005), 101);
  assert.equal(toCents(0.1 + 0.2), 30);
  assert.equal(toCents(2.5), 250);
  assert.match(formatCost(2268200), /22[,.]682[,.]00/);
  for (const invalid of [-1, NaN, Infinity, -Infinity]) assert.throws(() => toCents(invalid), RangeError);
  for (const invalid of [-1, 31, NaN, Infinity]) assert.throws(() => estimateProjectCosts({ contingencyPercent: invalid }), RangeError);
});

test("blog renders the estimate, navigation target, source links and labeled scenario controls", () => {
  const Page = load("app/page.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Page));
  for (const expected of ['id="estimacion-costos"', '7.3. Estimación de costos', '17,006.00', '22,682.00', '473.00', 'for="reserva-presupuesto"', 'aria-describedby="reutilizacion-ayuda"', 'aria-live="polite"']) {
    assert.ok(html.includes(expected), `Expected markup: ${expected}`);
  }
  for (const source of budget.sources) assert.ok(html.includes(source.url.replaceAll("&", "&amp;")));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "Duplicate HTML identifiers");
});

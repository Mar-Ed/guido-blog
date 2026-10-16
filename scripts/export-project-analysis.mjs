import fs from "node:fs";
import path from "node:path";
import Module from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentPath = path.join(projectRoot, "app/components/AnalysisGraphics.tsx");
const source = fs.readFileSync(componentPath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const graphicsModule = new Module(componentPath);
graphicsModule.filename = componentPath;
graphicsModule.paths = Module._nodeModulePaths(path.dirname(componentPath));
graphicsModule._compile(compiled, componentPath);

const { AnalysisTreeGraphic, AlternativesGraphic } = graphicsModule.exports;
const analysis = JSON.parse(fs.readFileSync(path.join(projectRoot, "app/data/project-analysis.json"), "utf8"));
const destination = path.join(projectRoot, "public/analisis");
fs.mkdirSync(destination, { recursive: true });

const graphics = [
  ["arbol-problemas-guido", React.createElement(AnalysisTreeGraphic, { tree: analysis.problem })],
  ["arbol-objetivos-guido", React.createElement(AnalysisTreeGraphic, { tree: analysis.objective, objective: true })],
  ["alternativas-solucion-guido", React.createElement(AlternativesGraphic, { alternatives: analysis.alternatives, recommendation: analysis.recommendation })],
];

for (const [name, graphic] of graphics) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n${renderToStaticMarkup(graphic)}\n`;
  fs.writeFileSync(path.join(destination, `${name}.svg`), svg, "utf8");
  await sharp(Buffer.from(svg), { density: 144 }).png().toFile(path.join(destination, `${name}.png`));
  process.stdout.write(`Exportados: public/analisis/${name}.svg y .png\n`);
}

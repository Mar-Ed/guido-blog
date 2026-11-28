"use client";

import { useState, type ReactNode } from "react";
import budget from "../data/project-costs.json";
import schedule from "../data/project-schedule.json";
import { estimateProjectCosts, formatCost, toCents } from "../lib/project-costs";

function BudgetDetails({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <i className="fas fa-chevron-down shrink-0 text-xs text-blue-700 group-open:rotate-180" aria-hidden="true"></i>
      </summary>
      <div className="space-y-4 border-t border-slate-200 p-4 sm:p-5">{children}</div>
    </details>
  );
}

function SourceLink({ source }: { source: string }) {
  const reference = budget.sources.find((item) => item.id === source);
  return reference ? (
    <a href={reference.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">
      Referencia comercial<span className="sr-only">: {reference.name} (abre en otra pestaña)</span>
    </a>
  ) : <span className="text-slate-600">Supuesto por cotizar</span>;
}

export default function ProjectCostEstimate() {
  const [reuseComputers, setReuseComputers] = useState(false);
  const [contingencyPercent, setContingencyPercent] = useState(budget.defaultContingencyPercent);
  const estimate = estimateProjectCosts({ reuseComputers, contingencyPercent });
  const numberClass = "whitespace-nowrap p-3 text-right align-top tabular-nums";

  return (
    <section id="estimacion-costos" aria-labelledby="estimacion-costos-titulo" className="scroll-mt-24 space-y-5 border-t border-slate-200 pt-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Presupuesto referencial · alternativa A3</p>
        <h4 id="estimacion-costos-titulo" className="mt-2 text-xl font-bold text-slate-900">7.3. Estimación de costos del proyecto</h4>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          Redes, puestos operativos y servicios cloud para conectar almacén y tienda de Guido. La estimación comprende las ocho fases del cronograma y doce meses de operación. Importes propuestos, pendientes de diagnóstico y cotizaciones.
        </p>
      </header>

      <fieldset className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <legend className="px-2 text-sm font-bold text-slate-900">Ajustar escenario</legend>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-slate-800">
            <input type="checkbox" checked={reuseComputers} onChange={(event) => setReuseComputers(event.target.checked)} aria-describedby="reutilizacion-ayuda" className="h-5 w-5 shrink-0 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" />
            Reutilizar las dos computadoras existentes
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="reserva-presupuesto" className="text-sm font-medium text-slate-800">Reserva sobre el costo inicial</label>
            <select id="reserva-presupuesto" value={contingencyPercent} onChange={(event) => setContingencyPercent(Number(event.target.value))} className="min-h-11 rounded-lg border border-slate-400 bg-white px-3 text-base text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              {[0, 10, 15, 20].map((percent) => <option key={percent} value={percent}>{percent} %</option>)}
            </select>
          </div>
        </div>
        <p id="reutilizacion-ayuda" className="mt-2 text-sm leading-relaxed text-slate-600">La reutilización requiere verificar estado, licencias y compatibilidad. La reserva propuesta de 10 % debe validarse con los riesgos del proyecto.</p>
      </fieldset>

      <div aria-live="polite" aria-atomic="true" className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-900">Implementación y reserva</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 tabular-nums">{formatCost(estimate.initialCents)}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">Incluye {formatCost(estimate.contingencyCents)} de reserva ({contingencyPercent} %).</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-700">Operación mensual</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 tabular-nums">{formatCost(estimate.monthlyCents)}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Cloud, Internet, soporte, energía, consumibles y copias.</p>
        </div>
        <div className="rounded-xl bg-slate-900 p-5 text-white">
          <p className="text-sm font-semibold text-teal-200">Implementación + 12 mensualidades</p>
          <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums">{formatCost(estimate.firstYearCents)}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">Costo inicial con reserva + {formatCost(estimate.annualOperatingCents)} de operación.</p>
        </div>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
        <strong>Base del escenario:</strong> dos puestos, ocho puntos de red y un Internet compartido dentro de un mismo local. Se estiman <strong>{estimate.totalHours} horas-persona</strong> de servicios TI a {formatCost(toCents(budget.hourlyRate))} por hora, distribuidas en las fases 1.1 a 1.8.
      </p>

      <BudgetDetails title="Ver presupuesto por fase: 1.1 a 1.8">
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">Las fases siguen el Gantt; las horas son esfuerzo de trabajo propuesto, no días de contratación completa. Los equipos y materiales se asignan al entregable donde se usan, aunque se compren en 1.3. Se cuentan una sola vez.</p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[700px] text-left text-sm leading-relaxed">
            <caption className="p-3 text-left font-bold text-slate-900">Costo directo de implementación por fase · soles</caption>
            <thead className="border-y border-slate-200 bg-slate-50"><tr><th scope="col" className="p-3">Fase y trabajo previsto</th><th scope="col" className="p-3 text-right">Horas</th><th scope="col" className="p-3 text-right">Servicios TI</th><th scope="col" className="p-3 text-right">Equipos y materiales</th><th scope="col" className="p-3 text-right">Subtotal</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {estimate.phases.map((phase) => (
                <tr key={phase.phase}>
                  <th scope="row" className="p-3 align-top font-normal text-slate-700">
                    <span className="block font-semibold text-slate-900">{phase.phase}. {schedule.phases.find((item) => item.code === phase.phase)?.title}</span>
                    <span className="mt-1 block">{phase.detail}</span>
                    <span className="mt-1 block text-slate-600">Duración de referencia: {phase.duration}.</span>
                  </th>
                  <td className={numberClass}>{phase.hours}</td><td className={numberClass}>{formatCost(phase.laborCents)}</td><td className={numberClass}>{formatCost(phase.materialsCents)}</td><td className={`${numberClass} font-semibold`}>{formatCost(phase.totalCents)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50 font-bold"><tr><th scope="row" className="p-3">Total directo, sin reserva</th><td className={numberClass}>{estimate.totalHours}</td><td className={numberClass}>{formatCost(estimate.laborCents)}</td><td className={numberClass}>{formatCost(estimate.materialsCents)}</td><td className={numberClass}>{formatCost(estimate.directCents)}</td></tr></tfoot>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">Total directo {formatCost(estimate.directCents)} + reserva {formatCost(estimate.contingencyCents)} = presupuesto de implementación {formatCost(estimate.initialCents)}. Las suscripciones están en la operación mensual.</p>
        <a href={budget.scheduleReference} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline underline-offset-4">Consultar las fases y duraciones de la conversación compartida en Claude<span className="sr-only"> (abre en otra pestaña)</span></a>
        <p className="text-sm leading-relaxed text-slate-600">Esa conversación aporta duraciones estimadas, no un presupuesto. Las horas y tarifas de esta sección son supuestos propios; los documentos adjuntos originales no se muestran en el enlace compartido.</p>
      </BudgetDetails>

      <BudgetDetails title="Ver cantidades y costos de equipos y materiales">
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm leading-relaxed">
            <caption className="p-3 text-left font-bold text-slate-900">Equipamiento y materiales de implementación · importes brutos estimados</caption>
            <thead className="border-y border-slate-200 bg-slate-50"><tr><th scope="col" className="p-3">Concepto y sustento</th><th scope="col" className="p-3 text-right">Cantidad</th><th scope="col" className="p-3 text-right">Precio unitario</th><th scope="col" className="p-3 text-right">Subtotal</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {estimate.initialItems.map((item) => <tr key={item.id}><th scope="row" className="p-3 align-top font-normal text-slate-700"><span className="block font-semibold text-slate-900">{item.name}</span><span className="mt-1 block">{item.basis}</span><SourceLink source={item.source} />{item.id === "computers" && reuseComputers && <span className="block font-semibold text-teal-800">Reutilización: compra excluida de este escenario.</span>}</th><td className={numberClass}>{item.quantity} {item.unit}{item.quantity > 1 && item.unit === "equipo" ? "s" : ""}</td><td className={numberClass}>{formatCost(toCents(item.unitCost))}</td><td className={`${numberClass} font-semibold`}>{formatCost(item.totalCents)}</td></tr>)}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50 font-bold"><tr><th scope="row" colSpan={3} className="p-3">Equipos, materiales y traslado · sin mano de obra</th><td className={numberClass}>{formatCost(estimate.materialsCents)}</td></tr></tfoot>
          </table>
        </div>
      </BudgetDetails>

      <BudgetDetails title="Ver gastos mensuales y cálculo de los doce meses">
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[460px] text-left text-sm leading-relaxed">
            <caption className="p-3 text-left font-bold text-slate-900">Operación prevista desde la primera activación</caption>
            <thead className="border-y border-slate-200 bg-slate-50"><tr><th scope="col" className="p-3">Concepto y supuesto</th><th scope="col" className="p-3 text-right">Costo mensual</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{estimate.monthlyItems.map((item) => <tr key={item.id}><th scope="row" className="p-3 align-top font-normal text-slate-700"><span className="block font-semibold text-slate-900">{item.name}</span><span className="mt-1 block">{item.basis}</span><SourceLink source={item.source} /></th><td className={`${numberClass} font-semibold`}>{formatCost(item.totalCents)}</td></tr>)}</tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50 font-bold"><tr><th scope="row" className="p-3">Total por mes</th><td className={numberClass}>{formatCost(estimate.monthlyCents)}</td></tr><tr><th scope="row" className="p-3">Total de operación · 12 meses</th><td className={numberClass}>{formatCost(estimate.annualOperatingCents)}</td></tr></tfoot>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">Se reservan doce mensualidades completas, incluyendo las que puedan consumirse durante las pruebas. No se presuponen descuentos anuales ni meses gratis. Para comparar alternativas en 7.2 habrá que descontar también los costos actuales que se sustituyan.</p>
      </BudgetDetails>

      <BudgetDetails title="Ver fuentes, supuestos y costos pendientes de validar">
        <p className="text-sm leading-relaxed text-slate-600">Consulta de referencias: {budget.reviewedAt}. Son precios publicados en las páginas consultadas, sujetos a cambios, stock y condiciones; no constituyen cotizaciones vigentes ni una selección de proveedor. Los demás importes son asignaciones de planificación.</p>
        <ul className="space-y-4">{budget.sources.map((source) => <li key={source.id} className="border-l-2 border-blue-200 pl-4"><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline underline-offset-4">{source.name}<span className="sr-only"> (abre en otra pestaña)</span></a><p className="text-sm leading-relaxed text-slate-700">{source.detail}</p></li>)}</ul>
        <h5 className="font-bold text-slate-900">Supuestos del presupuesto</h5>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">{budget.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul>
        <p className="border-l-2 border-amber-400 pl-4 text-sm leading-relaxed text-slate-700"><strong>Costos fuera del alcance estimado:</strong> {budget.exclusions}</p>
      </BudgetDetails>

      <p className="max-w-3xl text-sm leading-relaxed text-slate-600">Esta estimación permite planificar el desembolso de A3. El VAN, la relación B/C y el análisis de costo-efectividad siguen pendientes de medir beneficios, costos incrementales y resultados comparables.</p>
    </section>
  );
}

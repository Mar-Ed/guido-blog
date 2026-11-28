import type { ReactNode } from "react";
import analysis from "../data/project-analysis.json";
import evaluation from "../data/alternative-evaluation.json";
import ProjectCostEstimate from "./ProjectCostEstimate";

export function AnalysisDetails({ title, children }: { title: string; children: ReactNode }) {
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

export function AlternativeActions() {
  return (
    <section id="acciones-alternativas" aria-labelledby="acciones-alternativas-titulo" className="scroll-mt-24 space-y-5 border-t border-slate-200 pt-6">
      <h4 id="acciones-alternativas-titulo" className="text-xl font-bold text-slate-900">
        6.2. Identificación y organización de acciones en proyectos alternativos
      </h4>
      <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
        Se agrupan las acciones comunes y específicas de cada alternativa. La ejecución depende de aprobar la factibilidad y la inversión.
      </p>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h5 className="font-bold text-slate-900">Acciones comunes y complementarias</h5>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          {evaluation.commonActions.map((action) => <li key={action}>{action}</li>)}
        </ol>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {evaluation.actionGroups.map((group) => (
          <article key={group.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Paquete {group.id}</p>
            <h5 className="mt-2 text-lg font-bold text-slate-900">{analysis.alternatives.find((alternative) => alternative.id === group.id)?.name}</h5>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
              {group.actions.map((action) => <li key={action}>{action}</li>)}
            </ul>
            <div className="mt-4">
              <AnalysisDetails title="Entregable y responsables">
                <dl className="space-y-3 text-sm leading-relaxed">
              <div><dt className="font-semibold text-slate-900">Entregable de formulación</dt><dd className="text-slate-700">{group.deliverable}</dd></div>
              <div><dt className="font-semibold text-slate-900">Responsables propuestos</dt><dd className="text-slate-700">{group.owner}</dd></div>
                </dl>
              </AnalysisDetails>
            </div>
          </article>
        ))}
      </div>
      <p className="max-w-3xl border-l-2 border-blue-300 pl-4 text-sm leading-relaxed text-slate-700">
        <strong>Organización:</strong> cada paquete incluye las acciones comunes. A2 y A3 son opciones de infraestructura principal; capacitación, procedimientos y respaldo son complementarios.
      </p>
    </section>
  );
}

export default function AlternativeEvaluation() {
  return (
    <section id="evaluacion-alternativas" aria-labelledby="evaluacion-alternativas-titulo" className="scroll-mt-24 space-y-8 border-t border-slate-200 pt-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Decisión de inversión y sostenibilidad</p>
        <h3 id="evaluacion-alternativas-titulo" className="mt-2 text-2xl font-bold text-slate-900">7. Evaluación y justificación de alternativas</h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">Comparamos las alternativas según su funcionamiento, continuidad, soporte y costo para Guido.</p>
      </header>

      <section id="justificacion-alternativas" aria-labelledby="justificacion-alternativas-titulo" className="scroll-mt-24 space-y-5">
        <h4 id="justificacion-alternativas-titulo" className="text-xl font-bold text-slate-900">7.1. Evaluación de alternativas y justificación</h4>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700">Primero se verifica que cada opción cubra las mismas necesidades. Luego se comparan factibilidad, seguridad, costos, soporte y plazo.</p>
        <AnalysisDetails title="Ver requisitos, comparación y ponderación">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <h5 className="font-bold text-slate-900">Requisitos mínimos</h5>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">{evaluation.admissionRequirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">Una opción que no alcance la cobertura y funcionalidad acordadas debe reformularse o identificarse como solución parcial antes de comparar su costo con el de una solución completa.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm leading-relaxed">
            <caption className="px-5 py-4 text-left text-base font-bold text-slate-900">Comparación cualitativa de A1, A2 y A3</caption>
            <thead className="border-y border-slate-200 bg-slate-50 text-slate-900">
              <tr><th scope="col" className="p-4">Criterio</th>{analysis.alternatives.map((alternative) => <th scope="col" key={alternative.id} className="p-4">{alternative.id}<span className="mt-1 block font-normal text-slate-600">{alternative.name}</span></th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analysis.criteria.map((criterion) => <tr key={criterion.name}><th scope="row" className="p-4 align-top font-semibold text-slate-900">{criterion.name}</th>{criterion.values.map((value, index) => <td key={index} className="p-4 align-top text-slate-700">{value}</td>)}</tr>)}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[560px] text-left text-sm leading-relaxed">
            <caption className="px-5 py-4 text-left text-base font-bold text-slate-900">Segundo: ponderación propuesta para la evaluación</caption>
            <thead className="border-y border-slate-200 bg-slate-50"><tr><th scope="col" className="p-4">Criterio</th><th scope="col" className="p-4 text-right">Peso</th><th scope="col" className="p-4">Evidencia necesaria</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {evaluation.weightedCriteria.map((criterion) => <tr key={criterion.name}><th scope="row" className="p-4 align-top font-semibold text-slate-900">{criterion.name}</th><td className="p-4 text-right align-top tabular-nums text-slate-700">{criterion.weight} %</td><td className="p-4 align-top text-slate-700">{criterion.evidence}</td></tr>)}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50"><tr><th scope="row" className="p-4">Total</th><td className="p-4 text-right font-bold tabular-nums">{evaluation.weightedCriteria.reduce((sum, criterion) => sum + criterion.weight, 0)} %</td><td className="p-4 text-slate-600">Pesos sujetos a validación con gerencia.</td></tr></tfoot>
          </table>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600">Se propone calificar de 1 a 5 las alternativas admitidas, con una rúbrica y evidencia común. Puntaje = suma de (peso / 100 × calificación). Pesos, calificaciones y resultados requieren validación.</p>
        </AnalysisDetails>

        <div className="grid gap-4 xl:grid-cols-3">
          {evaluation.justifications.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-teal-700">{item.id} · {item.status}</p><p className="mt-3 text-sm leading-relaxed text-slate-700">{item.text}</p></article>)}
        </div>
        <div className="rounded-xl bg-slate-900 p-5 text-white sm:p-6">
          <h5 className="font-bold text-teal-200">Prioridad de estudio: A3</h5>
          <p className="mt-3 max-w-3xl text-base leading-relaxed">A3 se ajusta a la propuesta de redes y cloud. La elección final dependerá de pruebas, cotizaciones y capacidad de operación.</p>
        </div>
      </section>

      <section id="analisis-economico" aria-labelledby="analisis-economico-titulo" className="scroll-mt-24 space-y-6">
        <div>
          <h4 id="analisis-economico-titulo" className="text-xl font-bold text-slate-900">7.2. Análisis costo-beneficio y costo-efectividad</h4>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">Se comparan inversión, gastos de operación y resultados esperados durante un mismo periodo. A3 cuenta con un presupuesto referencial en el apartado 7.3; las cotizaciones finales y los indicadores económicos requieren mediciones y validación.</p>
        </div>

        <AnalysisDetails title="Ver costos a cotizar y base de comparación">
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">La comparación se hará en soles, con un horizonte y una tasa de descuento comunes. La base será la operación actual con mejoras menores viables sin la inversión propuesta.</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm leading-relaxed">
            <caption className="px-5 py-4 text-left text-base font-bold text-slate-900">Costos a levantar para cada alternativa</caption>
            <thead className="border-y border-slate-200 bg-slate-50"><tr><th scope="col" className="p-4">Rubro</th><th scope="col" className="p-4">Aplicación al proyecto</th><th scope="col" className="p-4">Sustento</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{evaluation.costItems.map((item) => <tr key={item.name}><th scope="row" className="p-4 align-top font-semibold text-slate-900">{item.name}</th><td className="p-4 align-top text-slate-700">{item.detail}</td><td className="p-4 align-top text-slate-700">{item.evidence}</td></tr>)}</tbody>
          </table>
        </div>
        </AnalysisDetails>

        <div className="grid items-start gap-4 xl:grid-cols-2">
        <article className="space-y-4 rounded-xl border border-blue-200 bg-blue-50/40 p-5 sm:p-6">
          <h5 className="text-lg font-bold text-slate-900">Costo-beneficio</h5>
          <p className="text-sm leading-relaxed text-slate-700">Compara la inversión y los gastos con beneficios monetarios sustentados. Se evalúa con el valor actual neto (VAN) y la relación beneficio-costo (B/C).</p>
          <AnalysisDetails title="Ver fórmulas y beneficios a medir">
          <div className="space-y-3 rounded-lg border border-blue-100 bg-white p-4 text-sm leading-7 text-slate-800">
            <p><code className="break-words">VAN = −I₀ + Σ desde t = 1 hasta n [(Bₜ − Cₜ) / (1 + r)ᵗ]</code></p>
            <p><code className="break-words">B/C = VP(beneficios) / [I₀ + VP(costos de operación y reposición)]</code></p>
            <p className="text-slate-600">I₀ es la inversión inicial; Bₜ, los beneficios del periodo; Cₜ, los costos adicionales de operación y reposición; r, la tasa por periodo; n, el número de periodos. VP significa valor presente. La inversión inicial se cuenta una sola vez.</p>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700">Con costos presentes positivos, VAN mayor que cero y B/C mayor que uno indicarían beneficios superiores a costos bajo los supuestos utilizados. Para alternativas excluyentes se contrastan alcance, flujos y VAN, junto con los requisitos técnicos; el mayor B/C por sí solo no determina la elección.</p>
          <dl className="space-y-4">{evaluation.benefitItems.map((item) => <div key={item.name} className="border-l-2 border-blue-200 pl-4"><dt className="font-semibold text-slate-900">{item.name}</dt><dd className="mt-2 text-sm leading-relaxed text-slate-700">{item.measurement}<span className="mt-1 block text-slate-600">{item.condition}</span></dd></div>)}</dl>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">Cada ahorro se registra una sola vez: si ya forma parte de los beneficios, no se vuelve a descontar como reducción de costos. Tampoco se presupuestan ventas recuperadas ni ahorros de personal sin sustento.</p>
          <a className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline underline-offset-4" href="https://www.nist.gov/el/applied-economics-office/manufacturing/capital-investment-analysis" target="_blank" rel="noopener noreferrer">Referencia: análisis de inversiones del NIST<span className="sr-only"> (abre en otra pestaña)</span></a>
          </AnalysisDetails>
        </article>

        <article className="space-y-4 rounded-xl border border-teal-200 bg-teal-50/40 p-5 sm:p-6">
          <h5 className="text-lg font-bold text-slate-900">Costo-efectividad</h5>
          <p className="text-sm leading-relaxed text-slate-700">Relaciona el costo con las operaciones adicionales correctamente registradas y consultables desde almacén y tienda. Se comparan opciones con alcance y calidad equivalentes.</p>
          <AnalysisDetails title="Ver cálculo y criterios de medición">
          <div className="space-y-2 rounded-lg border border-teal-100 bg-white p-4 text-sm leading-7 text-slate-800">
            <p><code className="break-words">CE = VP(costos incrementales frente a la base) / ΔQ</code></p>
            <p className="text-slate-600">ΔQ es el total de operaciones correctas adicionales respecto de la base, durante el horizonte común. Se requiere ΔQ mayor que cero. La unidad del indicador es soles por operación correcta adicional.</p>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700">Se comparan alternativas con el mismo alcance y calidad de servicio. Si sus niveles de efecto difieren, se analiza también cuánto cuesta obtener el efecto adicional. Este indicador complementa la decisión y no demuestra por sí mismo rentabilidad financiera.</p>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">El indicador se validará con una muestra comparable de operaciones, contando una sola vez cada evento y aplicando iguales reglas de corrección y consulta. La guía del MEF se usa como referencia académica de los métodos, adaptada a una empresa privada.</p>
          <a className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline underline-offset-4" href="https://www.mef.gob.pe/contenidos/inv_publica/docs/novedades/2015/guia_general.pdf" target="_blank" rel="noopener noreferrer">Referencia metodológica: guía del MEF<span className="sr-only"> (abre un PDF en otra pestaña)</span></a>
          </AnalysisDetails>
        </article>
        </div>

        <AnalysisDetails title="Ver datos pendientes y supuestos de evaluación">
          <dl className="mt-4 space-y-4">{evaluation.pendingData.map(([name, evidence]) => <div key={name} className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-4"><dt className="text-sm font-semibold text-slate-900">{name}</dt><dd className="text-sm leading-relaxed text-slate-700">{evidence}</dd></div>)}</dl>
          <p className="mt-5 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">Estado de A1, A2 y A3: VAN, B/C y CE sin calcular. Con los datos sustentados se revisarán escenarios de menor beneficio, mayor costo recurrente, interrupciones de Internet y reposiciones. La gerencia podrá decidir sobre la alternativa y su sostenibilidad.</p>
        </AnalysisDetails>
      </section>
      <ProjectCostEstimate />
    </section>
  );
}

import type { ReactNode } from "react";
import analysis from "../data/project-analysis.json";
import { AnalysisTreeGraphic, AlternativesGraphic, type AnalysisTree } from "./AnalysisGraphics";
import AlternativeEvaluation, { AlternativeActions } from "./AlternativeEvaluation";

const linkStyle = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function GraphicFrame({ title, file, children }: { title: string; file: string; children: ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-[#faf9f6]">
      <div className="[&_svg]:block [&_svg]:h-auto [&_svg]:w-full">{children}</div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
        <span className="text-sm text-slate-600">{title} · Inversiones Guido</span>
        <div className="flex flex-wrap gap-2">
          <a className={linkStyle} href={`/analisis/${file}.svg`} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-expand" aria-hidden="true"></i>
            Ver en tamaño completo<span className="sr-only"> (abre en otra pestaña)</span>
          </a>
          <a className={linkStyle} href={`/analisis/${file}.png`} download>
            <i className="fas fa-download" aria-hidden="true"></i>
            Descargar PNG
          </a>
          <a className={linkStyle} href={`/analisis/${file}.svg`} download>SVG</a>
        </div>
      </figcaption>
    </figure>
  );
}

function TreeOutline({ tree }: { tree: AnalysisTree }) {
  return (
    <details className="rounded-xl border border-slate-200 bg-white">
      <summary className="cursor-pointer rounded-xl px-5 py-4 font-semibold text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        Leer el árbol en texto
      </summary>
      <div className="space-y-5 border-t border-slate-100 p-5 text-base leading-relaxed text-slate-700 sm:p-6">
        <p><strong className="text-slate-900">{tree.central.label}: </strong>{tree.central.text}</p>
        <dl className="space-y-4">
          {[tree.final, ...tree.indirect, tree.direct].map((node) => (
            <div key={node.label}>
              <dt className="font-semibold text-slate-900">{node.label}</dt>
              <dd>{node.text}</dd>
            </div>
          ))}
        </dl>
        <ul className="space-y-5">
          {tree.branches.map((branch) => (
            <li key={branch.label}>
              <p><strong className="text-slate-900">{branch.label}: </strong>{branch.text}</p>
              {branch.validation && <p className="mt-1 text-sm font-medium text-amber-800">{branch.validation}</p>}
              <ul className="mt-3 space-y-3 border-l-2 border-slate-200 pl-4">
                {branch.children.map((child) => <li key={child.label}><strong className="text-slate-900">{child.label}: </strong>{child.text}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function ProjectAnalysis() {
  return (
    <section id="analisis-proyecto" aria-labelledby="analisis-proyecto-titulo" className="scroll-mt-24 space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Diagnóstico y formulación de la propuesta</p>
        <h2 id="analisis-proyecto-titulo" className="max-w-4xl text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Análisis del problema, objetivos y alternativas de solución
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600">
          Del registro en papel y hojas de cálculo a una propuesta de redes y servicios cloud que apoye el inventario, las ventas, la comunicación entre almacén y tienda y la facturación electrónica.
        </p>
        <nav aria-label="Contenido del análisis" className="flex flex-wrap gap-2">
          <a className={linkStyle} href="#arbol-problemas">Problema</a>
          <a className={linkStyle} href="#arbol-objetivos">Objetivos</a>
          <a className={linkStyle} href="#alternativas-solucion">Alternativas</a>
          <a className={linkStyle} href="#acciones-alternativas">Acciones</a>
          <a className={linkStyle} href="#evaluacion-alternativas">Evaluación</a>
          <a className={linkStyle} href="#analisis-economico">Costos y beneficios</a>
        </nav>
        <p className="max-w-3xl border-l-2 border-blue-300 pl-4 text-sm leading-relaxed text-slate-600">
          Base del análisis: diagnóstico empresarial y evidencias del blog. La <a href="#primera-entrevista" className="font-semibold text-blue-700 underline underline-offset-4">primera entrevista</a> aporta la trayectoria familiar y los retos logísticos. La capacidad de red, los equipos y los procedimientos se contrastarán en el levantamiento técnico.
        </p>
      </header>

      <section id="arbol-problemas" aria-labelledby="arbol-problemas-titulo" className="scroll-mt-24 space-y-5">
        <div>
          <h3 id="arbol-problemas-titulo" className="text-2xl font-bold text-slate-900">Análisis del problema</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            Las causas indirectas alimentan tres causas directas. Estas explican el problema central y sus posibles efectos en los pedidos, la facturación y el servicio.
          </p>
        </div>
        <GraphicFrame title="Árbol de problemas" file="arbol-problemas-guido">
          <AnalysisTreeGraphic tree={analysis.problem} />
        </GraphicFrame>
        <p className="text-sm leading-relaxed text-slate-600">{analysis.problem.note}</p>
        <TreeOutline tree={analysis.problem} />
      </section>

      <section id="arbol-objetivos" aria-labelledby="arbol-objetivos-titulo" className="scroll-mt-24 space-y-5">
        <div>
          <h3 id="arbol-objetivos-titulo" className="text-2xl font-bold text-slate-900">Análisis de objetivos</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            Cada condición negativa se transforma en una situación deseada. Se conserva la correspondencia entre las ramas de ambos árboles.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Efectos", "Fines", "Menos reprocesos y mayor confianza del cliente."],
            ["Problema central", "Objetivo central", "Conectividad y registro operativo habilitados."],
            ["Causas", "Medios", "Registros organizados, infraestructura y personas preparadas."],
          ].map(([from, to, description]) => (
            <div key={from} className="border-l-2 border-teal-300 bg-teal-50/50 px-4 py-4">
              <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-teal-900">{from}<i className="fas fa-arrow-right" aria-hidden="true"></i>{to}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
            </div>
          ))}
        </div>
        <GraphicFrame title="Árbol de objetivos" file="arbol-objetivos-guido">
          <AnalysisTreeGraphic tree={analysis.objective} objective />
        </GraphicFrame>
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-5 sm:p-6">
          <h4 className="font-bold text-teal-950">Por qué el objetivo sigue el modelo SMART</h4>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {[
              ["S · Específico", "Redes y servicios cloud para almacén, tienda y sus operaciones."],
              ["M · Medible", "100 % de los puestos definidos, con pruebas de conectividad y registro."],
              ["A · Alcanzable", "Equipos y servicios existentes; capacidad y presupuesto por validar."],
              ["R · Relevante", "Atiende el registro fragmentado y la comunicación entre áreas."],
              ["T · Temporal", "12 semanas desde la aprobación del proyecto."],
            ].map(([label, text]) => <div key={label}><dt className="text-sm font-bold text-teal-950">{label}</dt><dd className="mt-1 text-sm leading-relaxed text-slate-700">{text}</dd></div>)}
          </dl>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">{analysis.objective.note}</p>
        <TreeOutline tree={analysis.objective} />
      </section>

      <section id="alternativas-solucion" aria-labelledby="alternativas-solucion-titulo" className="scroll-mt-24 space-y-6">
        <div>
          <h3 id="alternativas-solucion-titulo" className="text-2xl font-bold text-slate-900">6. Alternativas de solución</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            Se comparan tres formas de atender el problema. El alcance comprende adquisición de equipos, instalación de redes, contratación y configuración de servicios existentes y mejora de procesos.
          </p>
        </div>
        <h4 className="text-xl font-bold text-slate-900">6.1. Proyectos alternativos planteados</h4>
        <GraphicFrame title="Alternativas de solución" file="alternativas-solucion-guido">
          <AlternativesGraphic alternatives={analysis.alternatives} recommendation={analysis.recommendation} />
        </GraphicFrame>
        <div className="grid gap-4 xl:grid-cols-3">
          {analysis.alternatives.map((alternative) => (
            <article key={alternative.id} className={`rounded-xl border p-5 ${alternative.id === "A3" ? "border-teal-300 bg-teal-50/60" : "border-slate-200 bg-white"}`}>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">{alternative.id} · {alternative.id === "A3" ? "Priorizar evaluación" : "Alternativa"}</p>
              <h5 className="mt-2 text-lg font-bold text-slate-900">{alternative.name}</h5>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{alternative.description}</p>
              <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                <div><dt className="font-semibold text-slate-900">Aporte esperado</dt><dd className="text-slate-700">{alternative.advantage}</dd></div>
                <div><dt className="font-semibold text-slate-900">Limitación</dt><dd className="text-slate-700">{alternative.limitation}</dd></div>
                <div><dt className="font-semibold text-slate-900">Evaluación económica</dt><dd className="text-slate-700">{alternative.cost}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <AlternativeActions />
        <aside className="border-t border-slate-200 pt-5 text-sm leading-relaxed text-slate-600" aria-label="Alcance y referencias técnicas">
          <p className="max-w-3xl">La infraestructura brinda conectividad y equipos de acceso. El registro y la emisión de comprobantes requieren configurar herramientas o servicios existentes compatibles y verificar el mecanismo de emisión electrónica aplicable. El proyecto se concentra en infraestructura TI y su puesta en operación.</p>
          <p className="mt-3 font-semibold text-slate-800">Referencias técnicas para validar la propuesta</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            <li><a className="text-blue-700 underline underline-offset-4" href="https://www.cisco.com/site/us/en/learn/topics/small-business/wireless-network.html" target="_blank" rel="noopener noreferrer">Cisco: redes cableadas e inalámbricas<span className="sr-only"> (abre en otra pestaña)</span></a></li>
            <li><a className="text-blue-700 underline underline-offset-4" href="https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility" target="_blank" rel="noopener noreferrer">Microsoft: responsabilidades en cloud<span className="sr-only"> (abre en otra pestaña)</span></a></li>
            <li><a className="text-blue-700 underline underline-offset-4" href="https://cpe.sunat.gob.pe/aliados/pse" target="_blank" rel="noopener noreferrer">SUNAT: proveedores de servicios electrónicos<span className="sr-only"> (abre en otra pestaña)</span></a></li>
          </ul>
        </aside>
      </section>
      <AlternativeEvaluation />
    </section>
  );
}

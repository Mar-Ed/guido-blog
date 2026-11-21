import Image from "next/image";
import schedule from "../data/project-schedule.json";

const actionClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

type ScheduleImage = {
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

function ScheduleFigure({ chart }: { chart: ScheduleImage }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <a
        href={chart.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ampliar ${chart.title.toLocaleLowerCase("es")}. Abre la imagen completa en otra pestaña.`}
        className="block cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-600"
      >
        <Image
          src={chart.src}
          width={chart.width}
          height={chart.height}
          alt={chart.alt}
          sizes="(min-width: 1536px) 1152px, (min-width: 1024px) calc(100vw - 400px), (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
          loading="lazy"
          className="block h-auto w-full object-contain"
        />
      </a>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
        <p className="text-sm leading-relaxed text-slate-600">
          Elaborado en <span className="font-semibold text-slate-800">{schedule.software}</span>.
          {" "}
          <a
            href={schedule.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Archivos del proyecto en Drive<span className="sr-only"> (abre en otra pestaña)</span>
          </a>
        </p>
        <div className="flex flex-wrap gap-2">
          <a className={actionClass} href={chart.src} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-expand" aria-hidden="true"></i>
            Ver a tamaño completo<span className="sr-only"> (abre en otra pestaña)</span>
          </a>
          <a className={actionClass} href={chart.src} download aria-label={`Descargar imagen: ${chart.title}`}>
            <i className="fas fa-download" aria-hidden="true"></i>
            Descargar
          </a>
        </div>
      </figcaption>
    </figure>
  );
}

export default function ProjectSchedule() {
  return (
    <section id="cronograma-proyecto" aria-labelledby="cronograma-proyecto-titulo" className="min-w-0 scroll-mt-24 space-y-8">
      <header className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Planificación de la implementación propuesta</p>
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="cronograma-proyecto-titulo" className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Cronograma del proyecto</h2>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-800">
            <i className="fas fa-chart-gantt" aria-hidden="true"></i>
            ProjectLibre
          </span>
        </div>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600">
          Diagrama de Gantt general y detalle de las ocho fases de Inversiones Guido. El cronograma se elaboró en ProjectLibre y los archivos del proyecto se encuentran en la carpeta de Google Drive.
        </p>
        <a
          href={schedule.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <i className="fas fa-folder-open" aria-hidden="true"></i>
          Ver archivos en Google Drive
          <i className="fas fa-arrow-up-right-from-square text-xs" aria-hidden="true"></i>
          <span className="sr-only"> (abre en otra pestaña)</span>
        </a>
      </header>

      <nav aria-label="Navegación del cronograma" className="flex flex-wrap gap-2">
        <a className={actionClass} href="#gantt-general">General</a>
        {schedule.phases.map((phase) => (
          <a key={phase.code} className={actionClass} href={`#gantt-fase-${phase.code.replace(".", "-")}`}>
            <span className="font-bold text-blue-700">{phase.code}</span>
            {phase.label}
          </a>
        ))}
      </nav>

      <section id="gantt-general" aria-labelledby="gantt-general-titulo" className="scroll-mt-24 space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Vista general</p>
          <h3 id="gantt-general-titulo" className="mt-2 text-2xl font-bold text-slate-900">{schedule.general.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-slate-600">{schedule.general.description}</p>
        </div>
        <ScheduleFigure chart={schedule.general} />
        <p className="border-l-2 border-slate-300 pl-4 text-sm leading-relaxed text-slate-600">
          Periodo del gráfico general: 4 de enero al 24 de marzo de 2027. Las capturas de 1.5 y 1.6 muestran noviembre y diciembre; sus fechas requieren conciliación con el cronograma general.
        </p>
      </section>

      <section aria-labelledby="gantt-fases-titulo" className="space-y-6">
        <div>
          <h3 id="gantt-fases-titulo" className="text-2xl font-bold text-slate-900">Detalle por fases</h3>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">Cada diagrama presenta las actividades de su fase. Abre la imagen completa para consultar las tareas y fechas con mayor detalle.</p>
        </div>
        <div className="space-y-8">
          {schedule.phases.map((phase) => {
            const id = `gantt-fase-${phase.code.replace(".", "-")}`;
            return (
              <section key={phase.code} id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-24 space-y-4">
                <div className="flex items-start gap-3 border-t border-slate-200 pt-6 sm:gap-4">
                  <span className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-3 font-bold text-blue-700">{phase.code}</span>
                  <div className="min-w-0">
                    <h4 id={`${id}-titulo`} className="text-balance text-xl font-bold text-slate-900">{phase.title}</h4>
                    <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">{phase.description}</p>
                  </div>
                </div>
                <ScheduleFigure chart={phase} />
              </section>
            );
          })}
        </div>
      </section>
    </section>
  );
}

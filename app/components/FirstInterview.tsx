import Image from "next/image";

const interviewPhotos = [
  {
    src: "/entrevista_!.jpeg",
    width: 1200,
    height: 1600,
    alt: "Participantes de la primera entrevista junto a un mueble con lavamanos.",
    caption: "Recorrido y revisión de mobiliario",
  },
  {
    src: "/entrevista_1.jpeg",
    width: 1544,
    height: 1599,
    alt: "Participantes de la primera entrevista observando una estructura de madera.",
    caption: "Observación de una estructura de madera",
  },
  {
    src: "/entrevista_2.jpeg",
    width: 1574,
    height: 1599,
    alt: "Conversación junto a una estructura de madera durante la primera entrevista.",
    caption: "Intercambio durante el recorrido",
  },
];

const interviewExchanges = [
  {
    question: "Hola, tía, gracias por darme un ratito. Hoy te voy a preguntar acerca sobre tu empresa, ¿no?, Inversiones Grandes Ideas. ¿Nos cuentas un poco a qué te dedicas?",
    answer: "A la fabricación de muebles tanto para oficina como para uso familiar.",
  },
  {
    question: "Ya, excelente. ¿Cómo empezó todo? ¿Hace cuánto tienen la empresa aproximadamente?",
    answer: "La empresa ya tiene más de 12 años. Empezó como en un taller en casa, donde trabajábamos miembros de la familia, ¿no? Y poco a poco se fue incrementando, ahora con talleres en el Parque Industrial, y ahí mismo se fabrica y se vende, pues, en la tienda de exhibición.",
  },
  {
    question: "Ah, ya, interesante. ¿Qué muebles hacen y cuáles son los que más se venden?",
    answer: "Especialmente son roperos; luego también pueden ser zapateras, mesas para planchado y también fabricamos a pedido, ¿no? De repente juegos de escritorio y roperos, o si no para oficina también.",
  },
  {
    question: "¿Cuál ha sido lo más difícil de tener tu propia empresa?",
    answer: "A lo largo de estos años el problema ha sido más que todo en la parte logística, ya que hemos cambiado dos veces también de nombre. Y el de trabajar para exportar, ¿no?, porque en este caso no sabíamos cómo era el de traer materiales de exportación para que aminore el gasto y haya menos inversión y más ganancia.",
  },
  {
    question: "¿Qué los hace diferentes a otras mueblerías?",
    answer: "Tratamos de que la calidad del producto no aminore en cuanto a los gastos, para que así también los clientes de alguna manera vuelvan a confiar en nosotros y siga, pues, ¿no?, el prestigio del producto que ofrecemos a los clientes.",
  },
  {
    question: "Para ir cerrando, ¿qué consejos le darías a los jóvenes emprendedores?",
    answer: "Bueno, todo esto demanda mucho empeño y responsabilidad, ¿no? Porque para nosotros tener ahora la empresa hemos tenido que sacrificar muchas cosas, ¿no?, como tiempo, muchas veces compartir con la familia... Pero todo con esfuerzo, hoy podemos ver ya una empresa constituida donde más que todo es familiar, ya que mis hijos también participan en esta empresa.",
  },
];

export default function FirstInterview() {
  return (
    <section
      id="primera-entrevista"
      aria-labelledby="primera-entrevista-titulo"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="p-5 sm:p-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
            <i className="fas fa-microphone" aria-hidden="true"></i>
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              Entrevista 01 &bull; Evidencia de campo
            </p>
            <h3 id="primera-entrevista-titulo" className="text-2xl font-bold tracking-tight text-slate-900">
              Primera entrevista
            </h3>
            <p id="primera-entrevista-descripcion" className="mt-2 text-sm leading-relaxed text-slate-600">
              Conversación sobre el origen, los productos y los retos logísticos de Inversiones Grandes Ideas.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <i className="fas fa-headphones text-blue-700" aria-hidden="true"></i>
            Escuchar entrevista
          </p>
          <audio
            controls
            preload="metadata"
            aria-label="Audio de la primera entrevista de Inversiones Grandes Ideas"
            aria-describedby="primera-entrevista-descripcion"
            className="block w-full min-w-0"
          >
            <source src="/audio_formulacion.ogg" type="audio/ogg" />
            Tu navegador no permite reproducir este audio. Puedes descargarlo mediante el enlace siguiente.
          </audio>
          <a
            href="/audio_formulacion.ogg"
            download="primera-entrevista-inversiones-guido.ogg"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-semibold text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <i className="fas fa-download" aria-hidden="true"></i>
            Descargar audio
          </a>
        </div>

        <section aria-labelledby="primera-entrevista-fotos-titulo" className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h4 id="primera-entrevista-fotos-titulo" className="text-lg font-bold text-slate-900">
              Registro fotográfico
            </h4>
            <span className="text-sm text-slate-600">{interviewPhotos.length} fotografías de la primera entrevista</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {interviewPhotos.map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <a
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${photo.caption}. Ver fotografía completa en otra pestaña.`}
                  className="block rounded-t-xl focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-blue-600"
                >
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 90vw"
                    className="h-80 w-full object-contain xl:h-72"
                  />
                </a>
                <figcaption className="border-t border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      <details className="group border-t border-slate-200">
        <summary className="flex min-h-14 cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-5 py-5 text-slate-900 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600 sm:px-8 [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2 font-semibold">
            <i className="fas fa-file-lines text-blue-700" aria-hidden="true"></i>
            Transcripción completa
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-blue-700">
            <span className="group-open:hidden">Mostrar</span>
            <span className="hidden group-open:inline">Ocultar</span>
            <i className="fas fa-chevron-down group-open:rotate-180" aria-hidden="true"></i>
          </span>
        </summary>
        <ol className="space-y-6 border-t border-slate-100 px-5 py-6 sm:px-8">
          {interviewExchanges.map(({ question, answer }) => (
            <li key={question} className="space-y-3">
              <p className="text-base leading-7 text-slate-700">
                <span className="font-semibold text-blue-800">Entrevistador: </span>
                {question}
              </p>
              <p className="border-l-2 border-blue-200 pl-4 text-base leading-7 text-slate-700">
                <span className="font-semibold text-slate-900">Entrevistada: </span>
                {answer}
              </p>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}

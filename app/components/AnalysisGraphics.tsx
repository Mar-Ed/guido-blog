export type AnalysisNode = {
  label: string;
  text: string;
  validation?: string;
};

export type AnalysisTree = {
  title: string;
  subtitle: string;
  final: AnalysisNode;
  indirect: AnalysisNode[];
  direct: AnalysisNode;
  central: AnalysisNode;
  branches: (AnalysisNode & { children: AnalysisNode[] })[];
  note: string;
};

export type Alternative = {
  id: string;
  name: string;
  description: string;
  includes: string;
  advantage: string;
  limitation: string;
  cost: string;
};

// Conservative word wrapping keeps the exported SVG independent of browser fonts.
export function wrapDiagramText(text: string, maxCharacters: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const nextLine = line ? `${line} ${word}` : word;
    if (line && nextLine.length > maxCharacters) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function DiagramText({ text, x, y, width, size = 22, color = "#334155", weight = 400, lineHeight = 29 }: {
  text: string;
  x: number;
  y: number;
  width: number;
  size?: number;
  color?: string;
  weight?: number;
  lineHeight?: number;
}) {
  const lines = wrapDiagramText(text, Math.floor(width / (size * 0.57)));
  return (
    <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight}>
      {lines.map((line, index) => <tspan key={index} x={x} dy={index === 0 ? 0 : lineHeight}>{line}</tspan>)}
    </text>
  );
}

function DiagramNode({ node, x, y, width, height, central = false, objective = false, compact = false }: {
  node: AnalysisNode;
  x: number;
  y: number;
  width: number;
  height: number;
  central?: boolean;
  objective?: boolean;
  compact?: boolean;
}) {
  const color = objective ? "#0f766e" : "#9a3412";
  const labelSize = compact ? 19 : 18;
  const label = compact ? node.label.replace("Causa indirecta", "Causa").replace("Medio fundamental", "Medio") : node.label;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={16} fill={central ? "#0f172a" : "#ffffff"} stroke={central ? "#b89a55" : objective ? "#99c8bd" : "#e3baa5"} strokeWidth={central ? 2.5 : 1.5} />
      <text x={x + 22} y={y + 30} fill={central ? "#e6c984" : color} fontSize={labelSize} fontWeight={700}>
        {label.toLocaleUpperCase("es")}
      </text>
      <DiagramText text={node.text} x={x + 22} y={y + 62} width={width - 44} size={compact ? 20 : central ? 23 : 22} lineHeight={compact ? 27 : 30} color={central ? "#ffffff" : "#1e293b"} weight={central ? 500 : 400} />
      {node.validation && <text x={x + 22} y={y + height - 16} fill="#92400e" fontSize={16} fontWeight={600}>{node.validation}</text>}
    </g>
  );
}

function TreeConnections({ objective }: { objective: boolean }) {
  const color = objective ? "#0f766e" : "#b07858";
  const markerId = objective ? "objective-arrow" : "problem-arrow";
  const branches = [48, 560, 1072];
  return (
    <g fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round">
      <defs>
        <marker id={markerId} markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0 0 L8 4 L0 8 Z" fill={color} stroke="none" />
        </marker>
      </defs>
      <path d="M464 340 V312 H1136 V340" />
      <path d="M800 312 V288" markerEnd={`url(#${markerId})`} />
      <path d="M800 508 V484 M464 484 H1136" />
      <path d="M464 484 V462" markerEnd={`url(#${markerId})`} />
      <path d="M1136 484 V462" markerEnd={`url(#${markerId})`} />
      <path d="M800 676 V630" markerEnd={`url(#${markerId})`} />
      <path d="M288 932 V902 H1312 V932 M800 932 V902" />
      <path d="M800 902 V876" markerEnd={`url(#${markerId})`} />
      {branches.map((x, index) => (
        <g key={x}>
          {index < 2 ? <>
            <path d={`M${x + 116} 1144 V1126 H${x + 364} V1144`} />
            <path d={`M${x + 240} 1126 V1108`} markerEnd={`url(#${markerId})`} />
          </> : <path d={`M${x + 240} 1144 V1108`} markerEnd={`url(#${markerId})`} />}
        </g>
      ))}
    </g>
  );
}

export function AnalysisTreeGraphic({ tree, objective = false }: { tree: AnalysisTree; objective?: boolean }) {
  const prefix = objective ? "objective" : "problem";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1510" viewBox="0 0 1600 1510" role="img" aria-labelledby={`${prefix}-graphic-title ${prefix}-graphic-description`} fontFamily="Arial, Helvetica, sans-serif">
      <title id={`${prefix}-graphic-title`}>{`${tree.title} de Inversiones Guido`}</title>
      <desc id={`${prefix}-graphic-description`}>Leer de abajo hacia arriba: {objective ? "medios fundamentales, medios directos, objetivo SMART y fines" : "causas indirectas, causas directas, problema central y efectos"}. {tree.central.text}</desc>
      <rect width="1600" height="1510" fill="#faf9f6" />
      <text x="48" y="42" fontSize="17" letterSpacing="3" fontWeight="700" fill="#475569">INVERSIONES GUIDO · FORMULACIÓN DE PROYECTOS TI</text>
      <text x="48" y="94" fontSize="42" fontWeight="700" fill="#0f172a">{tree.title}</text>
      <text x="48" y="132" fontSize="21" fill="#475569">{tree.subtitle}</text>
      <TreeConnections objective={objective} />
      <DiagramNode node={tree.final} x={240} y={166} width={1120} height={118} objective={objective} />
      {tree.indirect.map((node, index) => <DiagramNode key={node.label} node={node} x={index === 0 ? 164 : 836} y={340} width={600} height={118} objective={objective} />)}
      <DiagramNode node={tree.direct} x={240} y={508} width={1120} height={118} objective={objective} />
      <DiagramNode node={tree.central} x={48} y={676} width={1504} height={196} central objective={objective} />
      {tree.branches.map((branch, index) => {
        const x = 48 + index * 512;
        return (
          <g key={branch.label}>
            <DiagramNode node={branch} x={x} y={932} width={480} height={172} objective={objective} />
            {branch.children.map((node, childIndex) => <DiagramNode key={node.label} node={node} x={x + childIndex * 248} y={1144} width={branch.children.length === 1 ? 480 : 232} height={224} compact objective={objective} />)}
          </g>
        );
      })}
      <line x1="48" y1="1398" x2="1552" y2="1398" stroke="#d6c8a7" />
      <DiagramText text={tree.note} x={48} y={1428} width={1504} size={18} lineHeight={24} color="#475569" />
    </svg>
  );
}

export function AlternativesGraphic({ alternatives, recommendation }: { alternatives: Alternative[]; recommendation: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1210" viewBox="0 0 1600 1210" role="img" aria-labelledby="alternatives-graphic-title alternatives-graphic-description" fontFamily="Arial, Helvetica, sans-serif">
      <title id="alternatives-graphic-title">Alternativas de solución para Inversiones Guido</title>
      <desc id="alternatives-graphic-description">Comparación cualitativa de mejora local, infraestructura centralizada local y redes con servicios cloud gestionados. Recomendación preliminar sujeta a factibilidad.</desc>
      <rect width="1600" height="1210" fill="#faf9f6" />
      <text x="48" y="42" fontSize="17" letterSpacing="3" fontWeight="700" fill="#475569">INVERSIONES GUIDO · INFRAESTRUCTURA TI</text>
      <text x="48" y="94" fontSize="42" fontWeight="700" fill="#0f172a">Análisis de alternativas de solución</text>
      <text x="48" y="132" fontSize="22" fill="#475569">Opciones completas para conectar almacén y tienda y apoyar el registro de operaciones</text>
      {alternatives.map((alternative, index) => {
        const x = 48 + index * 512;
        const recommended = alternative.id === "A3";
        return (
          <g key={alternative.id}>
            <rect x={x} y="176" width="480" height="724" rx="18" fill={recommended ? "#edf7f4" : "#ffffff"} stroke={recommended ? "#0f766e" : "#cbd5e1"} strokeWidth={recommended ? 2.5 : 1.5} />
            <text x={x + 26} y="215" fontSize="19" fontWeight="700" fill="#0f766e">ALTERNATIVA {alternative.id.slice(1)}</text>
            <DiagramText text={alternative.name} x={x + 26} y={258} width={428} size={29} weight={700} lineHeight={35} color="#0f172a" />
            <DiagramText text={alternative.description} x={x + 26} y={358} width={428} size={22} />
            <text x={x + 26} y="505" fontSize="17" fontWeight="700" fill="#0f766e">ALCANCE</text>
            <DiagramText text={alternative.includes} x={x + 26} y={538} width={428} size={21} lineHeight={28} />
            <text x={x + 26} y="676" fontSize="17" fontWeight="700" fill="#92400e">CONDICIÓN A EVALUAR</text>
            <DiagramText text={alternative.limitation} x={x + 26} y={710} width={428} size={21} lineHeight={28} />
            <text x={x + 26} y="856" fontSize="18" fontWeight="700" fill="#475569">Inversión y operación: por cotizar</text>
          </g>
        );
      })}
      <rect x="48" y="936" width="1504" height="168" rx="18" fill="#0f172a" />
      <text x="74" y="975" fontSize="18" letterSpacing="2" fontWeight="700" fill="#e6c984">RECOMENDACIÓN PRELIMINAR · A3</text>
      <DiagramText text={recommendation} x={74} y={1014} width={1452} size={23} lineHeight={32} color="#ffffff" />
      <text x="48" y="1155" fontSize="19" fill="#475569">Alcance: adquisición, contratación, instalación y configuración de infraestructura y servicios existentes.</text>
      <text x="48" y="1185" fontSize="19" fill="#475569">Evaluación preliminar. No se presupuestan ahorros, plazos comerciales ni tarifas sin evidencia.</text>
    </svg>
  );
}

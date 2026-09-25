"use client";

import { useState } from 'react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'interno' | 'externo'>('all');
  
  const [menuOpen, setMenuOpen] = useState({
    stakeholders: true,
    entradas: true,
    herramientas: true,
    salidas: true,
    empresa: true
  });

  const toggleMenu = (key: keyof typeof menuOpen) => {
    setMenuOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollTo = (id: string, section?: string) => {
    if (section) setActiveSection(section);
    setSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Datos para el Registro de Stakeholders (Enfoque Infraestructura de TI, Redes y Cloud POS)
  const stakeholdersData = [
    {
      id: "STK-01",
      nombre: "Gerente General (INVERSIONES GRANDES IDEAS S.A.C)",
      rol: "Patrocinador Principal (Sponsor)",
      tipo: "interno",
      fase: "Inicio / Cierre",
      poder: "Alto",
      interes: "Alto",
      apoyoActual: "Comprometido",
      apoyoDeseado: "Comprometido",
      expectativas: "Asegurar rentabilidad, viabilidad de inversión y reducción del 30% en costos de almacenamiento mediante equipamiento de red y servicios cloud POS.",
      estrategia: "Gestionar de Cerca (Informes ejecutivos sobre factibilidad técnica, adquisición de equipos e infraestructura de red)."
    },
    {
      id: "STK-02",
      nombre: "Jefatura de Almacén e Inventario",
      rol: "Líder de Almacén & Logística",
      tipo: "interno",
      fase: "Planificación / Ejecución",
      poder: "Alto",
      interes: "Alto",
      apoyoActual: "Alentador",
      apoyoDeseado: "Comprometido",
      expectativas: "Erradicar quiebres de stock mediante cableado estructurado, red local y lectoras de código de barras físicas para control en tiempo real entre almacén y tienda.",
      estrategia: "Gestionar de Cerca (Pruebas de conectividad, red y verificación de cobertura de señal en el taller/almacén de Villa El Salvador)."
    },
    {
      id: "STK-03",
      nombre: "Asesores de Ventas y Atención",
      rol: "Usuarios Operativos en Tienda",
      tipo: "interno",
      fase: "Ejecución / Operación",
      poder: "Bajo",
      interes: "Alto",
      apoyoActual: "Neutral",
      apoyoDeseado: "Alentador",
      expectativas: "Terminales POS físicas rápidas, lectoras de código de barras e impresoras térmicas de tickets que agilicen la venta y facturación SUNAT sin caídas de red.",
      estrategia: "Mantener Informado (Capacitación práctica para la adaptación al uso de nuevos equipos de cómputo y terminales POS físicas)."
    },
    {
      id: "STK-04",
      nombre: "Clientes Finales (Hogares y Empresas)",
      rol: "Consumidores de Muebles",
      tipo: "externo",
      fase: "Operación / Monitoreo",
      poder: "Bajo",
      interes: "Alto",
      apoyoActual: "Alentador",
      apoyoDeseado: "Comprometido",
      expectativas: "Emisión ágil de comprobantes electrónicos SUNAT al instante, entregas en plazos pactados (96.8% actual) y verificación inmediata de stock.",
      estrategia: "Mantener Informado (Comprobantes electrónicos directos y confirmación de despacho de muebles sin demoras)."
    },
    {
      id: "STK-05",
      nombre: "Proveedor de Servicios Cloud e Infraestructura de TI",
      rol: "Socio Proveedor de Redes y Nube",
      tipo: "externo",
      fase: "Planificación / Ejecución",
      poder: "Medio",
      interes: "Alto",
      apoyoActual: "Neutral",
      apoyoDeseado: "Alentador",
      expectativas: "Suministro de equipamiento de red, terminales POS y plataforma cloud para inventario y facturación SUNAT con disponibilidad garantizada del 99.8%.",
      estrategia: "Mantener Satisfecho (Pruebas de conectividad, red y operación de equipos físicos bajo acuerdos de nivel de servicio SLA)."
    },
    {
      id: "STK-06",
      nombre: "Equipo de Formulación TI (UNTELS)",
      rol: "Analistas y Formuladores del Proyecto TI",
      tipo: "interno",
      fase: "Todo el Ciclo de Vida",
      poder: "Medio",
      interes: "Alto",
      apoyoActual: "Comprometido",
      apoyoDeseado: "Comprometido",
      expectativas: "Formular y evaluar la factibilidad técnica, económica y operativa de la infraestructura de redes y servicios cloud POS bajo la metodología PMBOK (sin desarrollo de código).",
      estrategia: "Gestionar de Cerca (Alineación con el Caso de Negocio de infraestructura TI y auditoría continua de interesados)."
    }
  ];

  const filteredStakeholders = selectedFilter === 'all' 
    ? stakeholdersData 
    : stakeholdersData.filter(s => s.tipo === selectedFilter);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 h-16 fixed w-full z-30 flex items-center justify-between px-4 lg:px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-500 hover:text-slate-700 focus:outline-none w-10 h-10 flex items-center justify-center lg:hidden transition-colors rounded-md hover:bg-slate-100"
            aria-label="Abrir Menú"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          
          <div 
            onClick={() => scrollTo('hero', 'overview')}
            className="flex items-center gap-3 font-bold text-xl text-slate-900 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-lg shadow-sm">
              <i className="fas fa-users-viewfinder"></i>
            </div>
            <div className="flex flex-col">
              <span className="tracking-tight text-base font-extrabold leading-tight">STAKEHOLDERS &bull; PROYECTOS TI</span>
              <span className="text-[10px] font-semibold text-blue-600 tracking-wider">INVERSIONES GUIDO &bull; UNTELS</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 font-medium text-sm text-slate-600">
          <button onClick={() => scrollTo('empresa-perfil', 'empresa')} className="hover:text-blue-600 transition-colors">
            1. Empresa & SUNAT
          </button>
          <button onClick={() => scrollTo('lienzo-canvas', 'empresa')} className="hover:text-teal-600 transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Canvas (BMC)
          </button>
          <button onClick={() => scrollTo('entradas-pmbok', 'entradas')} className="hover:text-blue-600 transition-colors">
            2. Entradas & Caso Negocio
          </button>
          <button onClick={() => scrollTo('herramientas-pmbok', 'herramientas')} className="hover:text-blue-600 transition-colors">
            3. Herramientas & Matriz
          </button>
          <button onClick={() => scrollTo('salidas-pmbok', 'salidas')} className="hover:text-blue-600 transition-colors">
            4. Registro Stakeholders
          </button>
          <button onClick={() => scrollTo('galeria-fotos', 'empresa')} className="hover:text-blue-600 transition-colors">
            Evidencias de Campo
          </button>
          
          <button 
            onClick={() => scrollTo('salidas-pmbok', 'salidas')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm text-xs"
          >
            <i className="fas fa-id-card-clip"></i> Registro Formal
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`bg-white w-72 h-full pt-16 border-r border-slate-200 flex flex-col fixed lg:relative z-20 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none`}>
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block mb-1">Curso Académico</span>
          <h2 className="font-bold text-lg text-slate-900 leading-snug">Formulación de Proyectos TI</h2>
          <p className="text-xs font-semibold text-slate-500 mt-1">UNTELS &bull; Ing. de Sistemas</p>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {/* Vista General */}
          <div className="px-4 mb-2">
            <button 
              onClick={() => scrollTo('hero', 'overview')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors text-left ${activeSection === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <i className="fas fa-home w-5 text-center"></i>
              Inicio & Resumen
            </button>
          </div>

          {/* 1. Empresa Inversiones Guido */}
          <div className="px-4 mb-1">
            <button 
              onClick={() => toggleMenu('empresa')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold text-sm rounded-lg focus:outline-none transition-colors ${menuOpen.empresa ? 'text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <i className={`fas fa-building w-5 text-center ${menuOpen.empresa ? 'text-amber-600' : 'text-slate-400'}`}></i>
                1. Empresa & SUNAT
              </div>
              <i className={`fas fa-chevron-${menuOpen.empresa ? 'down' : 'right'} text-xs text-slate-400 transition-transform`}></i>
            </button>
            <ul className={`submenu-transition px-4 ml-4 border-l border-slate-200 mt-1 space-y-1 ${menuOpen.empresa ? 'submenu-open mb-3' : ''}`}>
              <li onClick={() => scrollTo('empresa-perfil', 'empresa')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Ficha SUNAT & RUC
              </li>
              <li onClick={() => scrollTo('lienzo-canvas', 'empresa')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50 flex items-center justify-between">
                <span>Lienzo Canvas (BMC)</span>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.2 rounded">9 Bloques</span>
              </li>
              <li onClick={() => scrollTo('galeria-fotos', 'empresa')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Evidencias de Campo
              </li>
            </ul>
          </div>

          {/* 2. Entradas e Insumos */}
          <div className="px-4 mb-1">
            <button 
              onClick={() => toggleMenu('entradas')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold text-sm rounded-lg focus:outline-none transition-colors ${menuOpen.entradas ? 'text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <i className={`fas fa-file-import w-5 text-center ${menuOpen.entradas ? 'text-blue-600' : 'text-slate-400'}`}></i>
                2. Entradas e Insumos
              </div>
              <i className={`fas fa-chevron-${menuOpen.entradas ? 'down' : 'right'} text-xs text-slate-400 transition-transform`}></i>
            </button>
            <ul className={`submenu-transition px-4 ml-4 border-l border-slate-200 mt-1 space-y-1 ${menuOpen.entradas ? 'submenu-open mb-3' : ''}`}>
              <li onClick={() => scrollTo('caso-negocio', 'entradas')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Caso de Negocio
              </li>
              <li onClick={() => scrollTo('factores-ambientales', 'entradas')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Factores Ambientales (EEF)
              </li>
              <li onClick={() => scrollTo('activos-procesos', 'entradas')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Políticas y Activos (OPA)
              </li>
            </ul>
          </div>

          {/* 3. Herramientas y Técnicas */}
          <div className="px-4 mb-1">
            <button 
              onClick={() => toggleMenu('herramientas')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold text-sm rounded-lg focus:outline-none transition-colors ${menuOpen.herramientas ? 'text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <i className={`fas fa-toolbox w-5 text-center ${menuOpen.herramientas ? 'text-indigo-600' : 'text-slate-400'}`}></i>
                3. Herramientas Usadas
              </div>
              <i className={`fas fa-chevron-${menuOpen.herramientas ? 'down' : 'right'} text-xs text-slate-400 transition-transform`}></i>
            </button>
            <ul className={`submenu-transition px-4 ml-4 border-l border-slate-200 mt-1 space-y-1 ${menuOpen.herramientas ? 'submenu-open mb-3' : ''}`}>
              <li onClick={() => scrollTo('matriz-poder-interes', 'herramientas')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Matriz Poder / Interés
              </li>
              <li onClick={() => scrollTo('tecnicas-recopilacion', 'herramientas')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Tormentas & Entrevistas
              </li>
              <li onClick={() => scrollTo('modelo-prominencia', 'herramientas')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Modelo de Prominencia
              </li>
            </ul>
          </div>

          {/* 4. Salidas Generadas */}
          <div className="px-4 mb-1">
            <button 
              onClick={() => toggleMenu('salidas')}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold text-sm rounded-lg focus:outline-none transition-colors ${menuOpen.salidas ? 'text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <i className={`fas fa-file-export w-5 text-center ${menuOpen.salidas ? 'text-emerald-600' : 'text-slate-400'}`}></i>
                4. Salidas Generadas
              </div>
              <i className={`fas fa-chevron-${menuOpen.salidas ? 'down' : 'right'} text-xs text-slate-400 transition-transform`}></i>
            </button>
            <ul className={`submenu-transition px-4 ml-4 border-l border-slate-200 mt-1 space-y-1 ${menuOpen.salidas ? 'submenu-open mb-3' : ''}`}>
              <li onClick={() => scrollTo('registro-stakeholders', 'salidas')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Registro de Stakeholders
              </li>
              <li onClick={() => scrollTo('matriz-involucramiento', 'salidas')} className="py-1.5 pl-4 text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors rounded-r-md hover:bg-slate-50">
                Matriz de Involucramiento
              </li>
            </ul>
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full pt-16 overflow-y-auto relative p-6 md:p-10 lg:p-14">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Hero Section */}
          <div id="hero" className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Text & Content */}
            <div className="lg:w-[55%] flex flex-col justify-center relative">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-bold tracking-wide uppercase border border-blue-200 shadow-sm">
                  Proyectos TI &bull; PMBOK
                </span>
                <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold tracking-wide uppercase border border-emerald-200 shadow-sm flex items-center gap-1.5">
                  <i className="fas fa-server"></i> Infraestructura TI
                </span>
                <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-full text-[11px] font-bold tracking-wide uppercase border border-slate-200 shadow-sm">
                  UNTELS
                </span>
              </div>

              {/* Title */}
              <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-[42px] text-slate-900 leading-[1.15] mb-5 tracking-tight">
                Formulación y Evaluación de Factibilidad para <span className="text-blue-600 relative inline-block">Infraestructura Tecnológica<span className="absolute bottom-1.5 left-0 w-full h-3 bg-blue-100 -z-10 rounded-sm opacity-60"></span></span> de Redes y Cloud POS
              </h1>
              
              {/* Subtitle / Description */}
              <div className="space-y-4 text-slate-600 mb-8 text-[15px] sm:text-base leading-relaxed">
                <p>
                  El presente trabajo aplicativo aborda la <strong>formulación, evaluación de factibilidad y gestión de interesados</strong> para la implementación de una <strong>Infraestructura Tecnológica Integrada de Puntos de Venta (POS) y Servicios Cloud</strong> en la MYPE <strong>INVERSIONES GRANDES IDEAS S.A.C</strong> (Nombre Comercial: <em>Inversiones Guido</em> &bull; RUC: <strong>20563735865</strong>), ubicada en el Parque Industrial de Villa El Salvador.
                </p>
                <p className="text-slate-500 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                  Actualmente, la empresa presenta deficiencias en su red operativa y gestión de almacén por falta de equipamiento adecuado. El proyecto evalúa la viabilidad de desplegar hardware (lectoras, terminales y red local) conectado a la nube, garantizando control de stock y emisión de comprobantes bajo normativa SUNAT.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-10">
                <button 
                  onClick={() => scrollTo('entradas-pmbok', 'entradas')}
                  className="bg-white border-2 border-slate-200 text-slate-700 px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 transition-all shadow-sm group"
                >
                  <i className="fas fa-file-contract text-blue-500 group-hover:scale-110 transition-transform"></i>
                  Caso de Negocio & Insumos
                </button>
                <button 
                  onClick={() => scrollTo('registro-stakeholders', 'salidas')}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all group hover:-translate-y-0.5"
                >
                  <i className="fas fa-table-list text-emerald-300 group-hover:scale-110 transition-transform"></i>
                  Registro de Stakeholders
                </button>
              </div>

              {/* Guion de Defensa para la Exposición */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                <div className="flex items-center gap-2.5 mb-2.5 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                  <i className="fas fa-shield-halved"></i>
                  <span>Defensa del Proyecto &bull; Enfoque de Infraestructura</span>
                </div>
                <p className="text-slate-300 text-[13px] leading-relaxed font-light italic">
                  &ldquo;Profesor, nuestro proyecto no es de desarrollo de software ni programación. Es un proyecto de <strong>Infraestructura de Tecnologías de Información</strong>. Evaluamos la factibilidad de equipar a Inversiones Guido con redes de comunicación, terminales POS físicas, lectoras de barras y servicios cloud para conectar el almacén con la tienda de Villa El Salvador y cumplir con la SUNAT.&rdquo;
                </p>
              </div>

              {/* Ficha de Integrantes del Grupo */}
              <div className="mt-12 pt-8 border-t border-slate-200/80">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <i className="fas fa-users"></i>
                    </div>
                    Equipo Formulador
                  </h3>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200/60 uppercase tracking-wide">
                    Proyecto TI
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { initials: 'BC', name: 'Benjamín Adriano Chipana Bandera', email: '2223110329@untels.edu.pe', color: 'blue' },
                    { initials: 'XZ', name: 'Xavier Diego Zegarra Ortega', email: '2113110140@untels.edu.pe', color: 'indigo' },
                    { initials: 'JA', name: 'Alfaro Mendoza José Luis', email: '2223080086@untels.edu.pe', color: 'emerald' },
                    { initials: 'MB', name: 'Marcelo Edmundo Bilbao Roca', email: '2313010105@untels.edu.pe', color: 'amber' }
                  ].map((member, idx) => (
                    <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200/70 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center gap-3.5 group cursor-default">
                      <div className={`w-10 h-10 rounded-full bg-${member.color}-100 text-${member.color}-700 flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform`}>
                        {member.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-800 text-[13px] truncate">{member.name}</p>
                        <a href={`mailto:${member.email}`} className={`text-[11.5px] text-${member.color}-600 hover:underline font-mono block truncate mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity`}>
                          {member.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Hero Image Graphic */}
            <div className="lg:w-[45%] w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group border-[6px] border-white ring-1 ring-slate-200/60">
                <img 
                  src="/fabrica.jpeg" 
                  alt="Taller de Fabricación y Almacén Inversiones Guido" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Floating Image Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-white/95 backdrop-blur shadow-lg px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-2 transform translate-x-2 group-hover:translate-x-0 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Locación Real</span>
                  </div>
                </div>

                <div className="absolute bottom-7 left-7 right-7 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block bg-blue-600/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest shadow-lg mb-3">
                    Evidencia de Campo
                  </span>
                  <h3 className="font-black text-2xl drop-shadow-lg leading-tight">Taller y Almacén Central</h3>
                  <p className="text-[13px] text-slate-300 drop-shadow-md flex items-center gap-2.5 mt-2 font-medium">
                    <i className="fas fa-map-location-dot text-blue-400"></i> Parque Industrial, Villa El Salvador
                  </p>
                </div>
              </div>
              
              {/* Decorative Background Elements behind the image */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 right-10 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>

          <hr className="border-slate-200 my-10" />

          {/* ========================================================
              SECCIÓN 1: CONTEXTO EMPRESARIAL & IDENTIFICACIÓN FISCAL (SUNAT)
             ======================================================== */}
          <div id="empresa-perfil" className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-block px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold tracking-wide uppercase mb-2 border border-amber-200">
                  Organización Beneficiaria &bull; Ficha SUNAT
                </div>
                <h2 className="font-bold text-3xl text-slate-900 tracking-tight">1. Contexto Empresarial & Identificación Fiscal</h2>
                <p className="text-slate-500 mt-2 text-lg">Información legal y tributaria registrada ante la SUNAT y entorno del negocio</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  RUC: 20563735865 &bull; ACTIVO
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  HABIDO
                </span>
              </div>
            </div>

            {/* Ficha Oficial Registrada en SUNAT */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Razón Social Oficial (SUNAT)</span>
                    <span className="text-[11px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded border border-slate-200">Sociedad Anónima Cerrada (S.A.C.)</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    INVERSIONES GRANDES IDEAS S.A.C
                  </h3>
                  <p className="text-sm text-slate-600 flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-blue-600">Nombre Comercial en Tienda / Showroom:</span> 
                    <span className="font-bold text-slate-800">Inversiones Guido (o Guido Muebles)</span>
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs text-center min-w-[140px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Número de RUC</span>
                    <span className="text-lg font-mono font-black text-blue-600 tracking-wider">20563735865</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs text-center min-w-[100px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Estado</span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block mt-0.5 border border-emerald-200">ACTIVO</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs text-center min-w-[100px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Condición</span>
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md inline-block mt-0.5 border border-blue-200">HABIDO</span>
                  </div>
                </div>
              </div>

              {/* Fila con detalles del registro */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-sm">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Representante Legal</span>
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <i className="fas fa-user-tie text-sm"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs">GERENTE GENERAL</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Desde: 25 de julio de 2014</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ubicación y Rubro</span>
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <i className="fas fa-location-dot text-sm"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs">Villa El Salvador, Lima</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Parque Industrial &bull; Mueblería</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Diagnóstico Operativo</span>
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <i className="fas fa-poll text-sm"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs">94 Encuestas Evaluadas</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">86% atención directa en tienda</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-blue-200 bg-blue-50/40">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">Alcance Tecnológico TI</span>
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <i className="fas fa-network-wired text-sm"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs">Redes & Cloud POS</p>
                      <p className="text-[11px] text-blue-700 font-semibold mt-0.5">Infraestructura TI &bull; Cero Código</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Los 3 Pilares del Proyecto de Infraestructura TI (Sin Código) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Metodología & Alcance</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">Componentes de Infraestructura Tecnológica, Redes y Cloud</h3>
                </div>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 w-max">
                  <i className="fas fa-microchip text-blue-600"></i> Adquisición, Configuración & Despliegue
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pilar 1: Hardware e Infraestructura */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-lg mb-3">
                      <i className="fas fa-barcode"></i>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1.5">Hardware e Infraestructura Física</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Instalación de puntos de red, cableado estructurado, lectoras de código de barras físicas, impresoras térmicas de tickets y terminales POS en los puestos de caja de la tienda.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-blue-700 font-semibold flex items-center gap-1">
                    <i className="fas fa-check"></i> Equipamiento Físico en Tienda
                  </div>
                </div>

                {/* Pilar 2: Servicios Cloud / SaaS */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg mb-3">
                      <i className="fas fa-cloud-arrow-up"></i>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1.5">Servicios Cloud / SaaS (Infraestructura TI)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Adquisición y configuración de una solución de servicios cloud en la nube para la gestión de inventario y facturación electrónica SUNAT (sin programar, solo implementación de infraestructura y configuración).
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-indigo-700 font-semibold flex items-center gap-1">
                    <i className="fas fa-check"></i> Servicios Cloud Preexistentes
                  </div>
                </div>

                {/* Pilar 3: Procesos y Redes */}
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg mb-3">
                      <i className="fas fa-network-wired"></i>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1.5">Procesos, Conectividad y Redes</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Optimización del ancho de banda y conectividad segura para la comunicación en tiempo real entre el almacén/taller y la tienda de Villa El Salvador, garantizando sincronización de stock sin papel.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <i className="fas fa-check"></i> Enlace Seguro Almacén - Tienda
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================
                LIENZO BUSINESS MODEL CANVAS DEL PROYECTO TI
               ======================================================== */}
            <div id="lienzo-canvas" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold tracking-wide uppercase mb-2 border border-teal-200">
                    Estrategia &bull; Business Model Canvas
                  </div>
                  <h3 className="font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">
                    Lienzo Canvas del Proyecto TI: Inversiones Guido
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Arquitectura estratégica del proyecto de Infraestructura Tecnológica de Redes y Servicios Cloud POS
                  </p>
                </div>
                <span className="text-xs font-semibold bg-white text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 w-max">
                  <i className="fas fa-layer-group text-teal-600"></i> Modelo de 9 Bloques
                </span>
              </div>

              {/* Contenedor Canvas */}
              <div className="bg-slate-50/70 p-4 sm:p-6 rounded-3xl border border-slate-200 space-y-4">
                
                {/* Cuadrícula Superior 5 Columnas (Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  
                  {/* 1. SOCIOS CLAVE */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                        <span>Socios Clave</span>
                        <i className="fas fa-handshake text-blue-500 text-sm"></i>
                      </h4>
                      <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">&bull;</span>
                          <span><strong>Proveedor Cloud & TI:</strong> Enlace, hosting y soporte de plataforma SaaS para inventario y facturación.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">&bull;</span>
                          <span><strong>Proveedores de Hardware:</strong> Terminales POS físicas, switches, cableado Cat 6 y lectoras ópticas.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">&bull;</span>
                          <span><strong>SUNAT:</strong> Validación fiscal y recepción directa de comprobantes electrónicos (OSE/PSE).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">&bull;</span>
                          <span><strong>Distribuidores de Madera y Herrajes:</strong> Aprovisionamiento en Lima Sur (Ducasse, tableros melamínicos).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">&bull;</span>
                          <span><strong>Equipo Formulador UNTELS:</strong> Consultores y evaluadores de factibilidad técnica/económica (PMBOK).</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 2. ACTIVIDADES Y RECURSOS CLAVE (Columna 2) */}
                  <div className="flex flex-col gap-4">
                    {/* Actividades Clave */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex-1 hover:border-slate-300 transition-colors">
                      <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                        <span>Actividades Clave</span>
                        <i className="fas fa-list-check text-indigo-500 text-sm"></i>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span>Tendido y certificación de cableado estructurado Cat 6 entre almacén y tienda.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span>Montaje físico y configuración de terminales POS, lectoras de barras e impresoras térmicas.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span>Parametrización del catálogo de muebles y conexión con API SUNAT.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span>Pruebas de conectividad, red y sincronización en tiempo real.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span>Capacitación práctica del personal de caja y almacén.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Recursos Clave */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex-1 hover:border-slate-300 transition-colors">
                      <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                        <span>Recursos Clave</span>
                        <i className="fas fa-boxes-stacked text-indigo-500 text-sm"></i>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span><strong>Infraestructura de Red:</strong> Cable UTP Cat 6, switch gestionable y puntos de acceso Wi-Fi.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span><strong>Hardware Físico:</strong> Terminales táctiles POS, lectoras de barras e impresoras térmicas.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span><strong>Servicios Cloud:</strong> Plataforma SaaS para facturación electrónica y kardex de inventario.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">&bull;</span>
                          <span><strong>Personal Operativo:</strong> Asesores en showroom y formuladores UNTELS.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 3. PROPUESTA DE VALOR (Destacado central con fondo verde oscuro #135d54) */}
                  <div className="bg-[#135d54] text-white p-5 sm:p-6 rounded-2xl border-2 border-[#0f4942] shadow-md flex flex-col justify-between">
                    <div>
                      <div className="inline-block px-2.5 py-0.5 bg-emerald-950/60 text-emerald-300 text-[10px] font-bold tracking-widest uppercase rounded-full mb-3">
                        Núcleo del Negocio
                      </div>
                      <h4 className="font-black text-sm uppercase tracking-wider text-white pb-3 mb-4 border-b border-emerald-700/60 flex items-center justify-between">
                        <span>Propuesta de Valor</span>
                        <i className="fas fa-gem text-emerald-300 text-base"></i>
                      </h4>
                      <ul className="space-y-3.5 text-xs text-emerald-50 leading-relaxed">
                        <li className="flex items-start gap-2.5">
                          <i className="fas fa-circle-check text-emerald-300 mt-0.5 shrink-0 text-xs"></i>
                          <span><strong>Control de Stock en Tiempo Real:</strong> Sincronización instantánea de inventario entre taller y tienda (cero quiebres de existencias).</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <i className="fas fa-circle-check text-emerald-300 mt-0.5 shrink-0 text-xs"></i>
                          <span><strong>Atención y Facturación Ágil:</strong> Reducción del tiempo de cobro en caja de 8 minutos a menos de 45 segundos por transacción.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <i className="fas fa-circle-check text-emerald-300 mt-0.5 shrink-0 text-xs"></i>
                          <span><strong>Erradicación del Registro en Papel:</strong> Eliminación de kardex manuales y pérdidas de comprobantes en el showroom.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <i className="fas fa-circle-check text-emerald-300 mt-0.5 shrink-0 text-xs"></i>
                          <span><strong>Trazabilidad y Menos Quejas:</strong> Reducción del 35% de reclamos por entrega de piezas dañadas o pedidos errados.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <i className="fas fa-circle-check text-emerald-300 mt-0.5 shrink-0 text-xs"></i>
                          <span><strong>Despliegue Rápido (Cero Código):</strong> Implementación 100% sobre hardware estandarizado y servicios cloud probados.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-emerald-700/50 text-[11px] text-emerald-200 font-semibold flex items-center justify-between">
                      <span>Cumplimiento SUNAT</span>
                      <span className="font-mono">RUC 20563735865</span>
                    </div>
                  </div>

                  {/* 4. RELACIÓN CON CLIENTES Y CANALES (Columna 4) */}
                  <div className="flex flex-col gap-4">
                    {/* Relación con Clientes */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex-1 hover:border-slate-300 transition-colors">
                      <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                        <span>Relación con Clientes</span>
                        <i className="fas fa-heart text-amber-500 text-sm"></i>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span>Atención personalizada y transparente con tickets detallados y código QR.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span>Capacitación y acompañamiento continuo a vendedores y almacenistas.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span>Soporte técnico directo con el proveedor cloud (SLA 99.8% disponibilidad).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span>Informes mensuales ejecutivos de ventas y rotación para Gerencia.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Canales */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex-1 hover:border-slate-300 transition-colors">
                      <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                        <span>Canales</span>
                        <i className="fas fa-store text-amber-500 text-sm"></i>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span><strong>Puntos de Venta Físicos (POS):</strong> Cajas con terminales táctiles, lectoras e impresoras térmicas.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span><strong>Estaciones de Almacén:</strong> Lectoras de código de barras para recepción y despacho.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span><strong>Dashboard Cloud:</strong> Panel web administrativo para supervisión directiva de existencias.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">&bull;</span>
                          <span><strong>Canal Digital:</strong> Envío de tickets electrónicos a clientes vía email/WhatsApp.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 5. SEGMENTOS DE CLIENTES */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                        <span>Segmentos de Clientes</span>
                        <i className="fas fa-users text-teal-600 text-sm"></i>
                      </h4>
                      <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">&bull;</span>
                          <span><strong>Clientes Finales de Muebles:</strong> Familias y oficinas que buscan rapidez, stock exacto y boletas SUNAT.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">&bull;</span>
                          <span><strong>Gerencia General (Sponsor):</strong> Tomador de decisiones que exige rentabilidad, control y cero multas.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">&bull;</span>
                          <span><strong>Asesores de Ventas y Cajeros:</strong> Usuarios en tienda que requieren equipos rápidos sin caídas de red.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">&bull;</span>
                          <span><strong>Personal de Almacén:</strong> Responsables del control de inventario físico y despacho de piezas.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold">&bull;</span>
                          <span><strong>Comercio de Villa El Salvador:</strong> Entorno local que percibe la formalidad y modernización del negocio.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>

                {/* Cuadrícula Inferior 2 Columnas (Costos vs Fuentes de Valor) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* ESTRUCTURA DE COSTOS */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                    <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                      <span>Estructura de Costos</span>
                      <i className="fas fa-wallet text-rose-500 text-sm"></i>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">&bull;</span>
                        <span><strong>Adquisición de Hardware Inicial:</strong> Compra de terminales táctiles POS, lectoras de código de barras e impresoras térmicas.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">&bull;</span>
                        <span><strong>Infraestructura de Red y Cableado:</strong> Insumos de cableado estructurado Cat 6, canaletas, switch gestionable y router.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">&bull;</span>
                        <span><strong>Suscripción Mensual Cloud / SaaS:</strong> Tarifa periódica por el servicio cloud de punto de venta, inventario y facturación OSE.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">&bull;</span>
                        <span><strong>Capacitación y Puesta en Marcha:</strong> Talleres de adaptación para el personal operativo y pruebas de estrés de red.</span>
                      </li>
                    </ul>
                  </div>

                  {/* FUENTES DE INGRESOS / RETORNO DE VALOR */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                    <h4 className="font-black text-xs uppercase tracking-wider text-slate-800 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                      <span>Fuentes de Ingresos / Retorno de Valor</span>
                      <i className="fas fa-chart-line text-emerald-600 text-sm"></i>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">&bull;</span>
                        <span><strong>Ahorro en Horas-Hombre y Papelería:</strong> Eliminación de talonarios manuales, kardex impresos y auditorías manuales lentas.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">&bull;</span>
                        <span><strong>Aumento en Ventas por Rapidez en Caja:</strong> Mayor capacidad de atención en horas punta del Parque Industrial de VES sin generar colas.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">&bull;</span>
                        <span><strong>Reducción del 30% en Costos de Almacenamiento:</strong> Eliminación de sobrestock y quiebres mediante control digital en tiempo real.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">&bull;</span>
                        <span><strong>Seguridad Tributaria SUNAT:</strong> Cero multas fiscales y cumplimiento automático de comprobantes de pago electrónicos.</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>

            {/* Galería de Evidencias Fotográficas de Campo */}
            <div id="galeria-fotos" className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-wide uppercase mb-1 border border-blue-200">
                    Evidencias Visuales de Campo
                  </div>
                  <h3 className="font-bold text-2xl text-slate-900 tracking-tight">Instalaciones y Entorno Real: Inversiones Guido</h3>
                  <p className="text-slate-500 text-sm">Registro fotográfico del taller, oficina administrativa y catálogo en Villa El Salvador</p>
                </div>
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 hidden sm:flex">
                  <i className="fas fa-camera text-blue-600"></i> 5 Tomas de Campo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                
                {/* Foto 1: Fabrica / Taller */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                  <div className="h-52 relative overflow-hidden bg-slate-900">
                    <img 
                      src="/fabrica.jpeg" 
                      alt="Taller y Almacén General" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                      Planta de Producción
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 mb-1.5">Taller de Ensamblaje y Almacén</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Nave industrial en Villa El Salvador donde se lleva a cabo el ensamblaje de muebles y el almacenamiento de tableros y piezas modulares.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-700 font-semibold flex items-center gap-1.5">
                      <i className="fas fa-user-gear"></i>
                      <span>Stakeholders: Jefatura de Almacén (STK-02)</span>
                    </div>
                  </div>
                </div>

                {/* Foto 2: Oficina Administrativa */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                  <div className="h-52 relative overflow-hidden bg-slate-900">
                    <img 
                      src="/oficina.jpeg" 
                      alt="Oficina y Facturación" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                      Administración y Ventas
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 mb-1.5">Puesto Operativo y Facturación</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Estación de trabajo donde se coordinan cotizaciones, pedidos manuales y gestión de herrajes industriales (Ducasse) para muebles y closets.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-indigo-700 font-semibold flex items-center gap-1.5">
                      <i className="fas fa-desktop"></i>
                      <span>Stakeholders: Asesores de Venta (STK-03)</span>
                    </div>
                  </div>
                </div>

                {/* Foto 3: Repisas y Showroom */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                  <div className="h-52 relative overflow-hidden bg-slate-900">
                    <img 
                      src="/repisas.jpeg" 
                      alt="Showroom y Repisas Terminadas" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                      Catálogo Terminado
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 mb-1.5">Showroom de Repisas y Módulos</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Exhibición de alacenas, reposteros y repisas terminadas para inspección de calidad final previa al despacho y entrega al cliente.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
                      <i className="fas fa-cart-shopping"></i>
                      <span>Stakeholders: Clientes Finales (STK-04)</span>
                    </div>
                  </div>
                </div>

                {/* Foto 4: Trabajando 1 (Proceso Manual) */}
                <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                  <div className="h-64 sm:h-72 relative overflow-hidden bg-slate-900">
                    <img 
                      src="/trabajando_1.jpeg" 
                      alt="Control manual en almacén" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                    <span className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                      Control Físico
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 mb-1.5">Inspección de Almacén a Mano</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Los pedidos, boletas y reportes de almacén se completan y revisan con lapicero, hoja por hoja. Los archivadores guardan los expedientes físicos, dificultando la trazabilidad.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-amber-700 font-semibold flex items-center gap-1.5">
                      <i className="fas fa-boxes-packing"></i>
                      <span>Stakeholders: Personal de Almacén (STK-02)</span>
                    </div>
                  </div>
                </div>

                {/* Foto 5: Trabajando 2 (Digitación) */}
                <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                  <div className="h-64 sm:h-72 relative overflow-hidden bg-slate-900">
                    <img
                      src="/trabajando_2.jpeg"
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-45"
                    />
                    <img 
                      src="/trabajando_2.jpeg" 
                      alt="Personal coordinando actividades operativas" 
                      className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 z-20 bg-slate-900/10 pointer-events-none"></div>
                    <span className="absolute z-30 top-3 left-3 bg-teal-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                      Operaciones y Procesos
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 mb-1.5">Doble Trabajo en la Digitación</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Con los apuntes en papel al lado del teclado, el inventario se digita uno a uno en Excel. Aquí nacen los errores de tipeo, cuellos de botella y descuadres de stock.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-teal-700 font-semibold flex items-center gap-1.5">
                      <i className="fas fa-clipboard-check"></i>
                      <span>Stakeholders: Gerencia & Supervisión (STK-01)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* ========================================================
              SECCIÓN 2: ENTRADAS E INSUMOS DEL PROCESO DE IDENTIFICACIÓN
             ======================================================== */}
          <div id="entradas-pmbok" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-wide uppercase mb-2 border border-blue-200">
                  Fase de Inicio &bull; PMBOK
                </div>
                <h2 className="font-bold text-3xl text-slate-900 tracking-tight">2. Entradas e Insumos Utilizados</h2>
                <p className="text-slate-500 mt-2 text-lg">Documentos base, factores ambientales y políticas que originan la lista de involucrados</p>
              </div>
              <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 w-max">
                <i className="fas fa-layer-group text-blue-600"></i> 4 Insumos Clave
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Insumo 1: Caso de Negocio */}
              <div id="caso-negocio" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                    <i className="fas fa-file-invoice-dollar"></i>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold uppercase">Entrada Fundamental</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Caso de Negocio (Business Case)</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  Justificación económica y estratégica del proyecto. En <strong>Inversiones Guido</strong>, sustenta la inversión en equipamiento hardware (terminales POS, lectoras de barras), cableado de red y contratación de servicios cloud para frenar pérdidas por quiebres de stock, eliminar costos de papelería física y agilizar la atención al cliente.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span><strong>Interesados derivados:</strong> Patrocinador, Gerente Financiero</span>
                  <i className="fas fa-check-circle text-emerald-600"></i>
                </div>
              </div>

              {/* Insumo 2: Factores Ambientales de la Empresa (EEF) */}
              <div id="factores-ambientales" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
                    <i className="fas fa-earth-americas"></i>
                  </div>
                  <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold uppercase">EEF & Entorno</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Factores Ambientales de la Empresa (EEF)</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  Factores internos y externos no controlables: el marco regulatorio fiscal de <strong>SUNAT (RUC 20563735865, Contribuyente Activo y Habido)</strong>, la cultura comercial en el Parque Industrial de <strong>Villa El Salvador</strong>, la infraestructura tecnológica actual (PCs básicas) y los canales de comunicación tradicionales del personal.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span><strong>Interesados derivados:</strong> Vendedores en tienda, Personal de Almacén</span>
                  <i className="fas fa-check-circle text-emerald-600"></i>
                </div>
              </div>

              {/* Insumo 3: Activos de los Procesos de la Organización (OPA) */}
              <div id="activos-procesos" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
                    <i className="fas fa-folder-tree"></i>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold uppercase">OPA & Políticas</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Activos de los Procesos de la Organización (OPA)</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  Formatos físicos y normativas existentes: registros manuales de kardex en papel, talonarios de comprobantes, políticas de garantías de muebles y manuales informales de atención al cliente.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span><strong>Interesados derivados:</strong> Jefe de Logística, Administrador</span>
                  <i className="fas fa-check-circle text-emerald-600"></i>
                </div>
              </div>

              {/* Insumo 4: Acuerdos y Contratos */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">Acuerdos Externos</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Acuerdos y Contratos de Suministro</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  Convenios comerciales con los proveedores de madera, pintura, tapicería y cerrajería en Lima Sur, así como compromisos pactados de entrega y despacho con clientes finales.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span><strong>Interesados derivados:</strong> Proveedores clave, Transportistas</span>
                  <i className="fas fa-check-circle text-emerald-600"></i>
                </div>
              </div>

            </div>
          </div>

          <hr className="border-slate-200" />

          {/* ========================================================
              SECCIÓN 3: HERRAMIENTAS Y TÉCNICAS UTILIZADAS
             ======================================================== */}
          <div id="herramientas-pmbok" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-wide uppercase mb-2 border border-indigo-200">
                  Análisis & Métodos
                </div>
                <h2 className="font-bold text-3xl text-slate-900 tracking-tight">3. Herramientas y Técnicas Empleadas</h2>
                <p className="text-slate-500 mt-2 text-lg">Metodologías para clasificar, ponderar y priorizar a cada interesado en Inversiones Guido</p>
              </div>
              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100 flex items-center gap-1.5 w-max">
                <i className="fas fa-chart-pie"></i> Matriz Poder / Interés
              </span>
            </div>

            {/* Matriz Poder / Interés Visual */}
            <div id="matriz-poder-interes" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                <div>
                  <h3 className="font-bold text-xl text-slate-900">Matriz de Clasificación Poder vs. Interés</h3>
                  <p className="text-slate-500 text-sm">Cuadrante estratégico para determinar el nivel de comunicación y gestión requerido</p>
                </div>
                <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
                  Eje X: <strong>Interés</strong> | Eje Y: <strong>Poder</strong>
                </div>
              </div>

              {/* Cuadrante 2x2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Cuadrante Alto Poder / Alto Interés */}
                <div className="p-5 rounded-xl bg-blue-50 border-2 border-blue-300 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded uppercase">Gestionar de Cerca</span>
                    <span className="text-xs font-semibold text-blue-700">Poder: Alto | Interés: Alto</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">Involucrar activamente y satisfacer plenamente sus expectativas clave.</p>
                  <div className="space-y-2 bg-white p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>• Guido (Patrocinador / Gerencia General)</span>
                      <span className="text-blue-600 font-mono">STK-01</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>• Jefatura de Almacén & Logística</span>
                      <span className="text-blue-600 font-mono">STK-02</span>
                    </div>
                  </div>
                </div>

                {/* Cuadrante Alto Poder / Bajo Interés */}
                <div className="p-5 rounded-xl bg-amber-50 border-2 border-amber-300 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold bg-amber-600 text-white px-2.5 py-0.5 rounded uppercase">Mantener Satisfecho</span>
                    <span className="text-xs font-semibold text-amber-700">Poder: Alto/Medio | Interés: Bajo</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">Mantener informados con reportes periódicos para evitar resistencias.</p>
                  <div className="space-y-2 bg-white p-3 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>• Proveedor de Servicios Cloud & TI</span>
                      <span className="text-amber-600 font-mono">STK-05</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>• Entidades Tributarias y Legales (SUNAT)</span>
                      <span className="text-amber-600 font-mono">EXT</span>
                    </div>
                  </div>
                </div>

                {/* Cuadrante Bajo Poder / Alto Interés */}
                <div className="p-5 rounded-xl bg-emerald-50 border-2 border-emerald-300 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded uppercase">Mantener Informado</span>
                    <span className="text-xs font-semibold text-emerald-700">Poder: Bajo | Interés: Alto</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">Comunicación bidireccional continua sobre cambios operativos.</p>
                  <div className="space-y-2 bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>• Asesores de Ventas de Tienda</span>
                      <span className="text-emerald-600 font-mono">STK-03</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>• Clientes Finales de Muebles</span>
                      <span className="text-emerald-600 font-mono">STK-04</span>
                    </div>
                  </div>
                </div>

                {/* Cuadrante Bajo Poder / Bajo Interés */}
                <div className="p-5 rounded-xl bg-slate-100 border-2 border-slate-300 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold bg-slate-600 text-white px-2.5 py-0.5 rounded uppercase">Monitorear</span>
                    <span className="text-xs font-semibold text-slate-700">Poder: Bajo | Interés: Bajo</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">Supervisar con mínimo esfuerzo sin saturar de mensajes.</p>
                  <div className="space-y-2 bg-white p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>• Servicios de Mensajería Esporádica</span>
                      <span className="text-slate-600 font-mono">EXT</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>• Público General de Villa El Salvador</span>
                      <span className="text-slate-600 font-mono">EXT</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Técnicas de Recopilación */}
            <div id="tecnicas-recopilacion" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg mb-3">
                  <i className="fas fa-brain"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Tormenta de Ideas</h4>
                <p className="text-xs text-slate-600">Sesiones participativas entre el equipo formulador de TI y jefes de área de Inversiones Guido para evaluar requerimientos de cableado y terminales físicas.</p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg mb-3">
                  <i className="fas fa-comments"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Entrevistas Individuales</h4>
                <p className="text-xs text-slate-600">Cuestionarios directos en la tienda y almacén para evaluar la adaptación al uso de nuevos equipos de cómputo y terminales POS físicas.</p>
              </div>

              <div id="modelo-prominencia" className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-3">
                  <i className="fas fa-diagram-project"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Modelo de Prominencia</h4>
                <p className="text-xs text-slate-600">Evaluación tridimensional basada en <strong>Poder</strong> (autoridad), <strong>Legitimidad</strong> (relación contractual) y <strong>Urgencia</strong> (necesidad de atención inmediata).</p>
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* ========================================================
              SECCIÓN 4: SALIDAS GENERADAS - REGISTRO DE STAKEHOLDERS
             ======================================================== */}
          <div id="salidas-pmbok" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold tracking-wide uppercase mb-2 border border-emerald-200">
                  Artefacto Oficial &bull; Salida del Proceso
                </div>
                <h2 className="font-bold text-3xl text-slate-900 tracking-tight">4. Registro de Stakeholders Formal</h2>
                <p className="text-slate-500 mt-2 text-lg">Catálogo consolidado de interesados con roles, expectativas y niveles de involucramiento</p>
              </div>

              {/* Filtro Interactivo */}
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold w-max">
                <button 
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${selectedFilter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Todos ({stakeholdersData.length})
                </button>
                <button 
                  onClick={() => setSelectedFilter('interno')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${selectedFilter === 'interno' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Internos
                </button>
                <button 
                  onClick={() => setSelectedFilter('externo')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${selectedFilter === 'externo' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Externos
                </button>
              </div>
            </div>

            {/* Tabla Detallada de Stakeholders */}
            <div id="registro-stakeholders" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">ID / Interesado</th>
                      <th className="py-3 px-4">Rol & Tipo</th>
                      <th className="py-3 px-4">Poder / Interés</th>
                      <th className="py-3 px-4">Involucramiento (Act &rarr; Des)</th>
                      <th className="py-3 px-4">Expectativas Principales</th>
                      <th className="py-3 px-4">Estrategia PMBOK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStakeholders.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 block w-max mb-1">
                            {s.id}
                          </span>
                          <strong className="text-slate-900 block">{s.nombre}</strong>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-slate-800 font-medium block text-xs">{s.rol}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded inline-block mt-1 ${s.tipo === 'interno' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                            {s.tipo}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-xs space-y-1">
                            <div>Poder: <span className="font-bold text-slate-900">{s.poder}</span></div>
                            <div>Interés: <span className="font-bold text-slate-900">{s.interes}</span></div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-xs">
                            <span className="text-slate-500">{s.apoyoActual}</span>
                            <span className="mx-1.5 text-blue-500 font-bold">&rarr;</span>
                            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              {s.apoyoDeseado}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-600 max-w-xs">
                          {s.expectativas}
                        </td>
                        <td className="py-4 px-4 text-xs">
                          <span className="font-semibold text-slate-900 block">{s.estrategia.split('(')[0]}</span>
                          <span className="text-slate-500 text-[11px] block mt-0.5">{s.estrategia.includes('(') ? s.estrategia.substring(s.estrategia.indexOf('(')) : ''}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Matriz de Evaluación del Involucramiento */}
            <div id="matriz-involucramiento" className="bg-slate-100 rounded-xl p-6 md:p-8 border border-slate-200">
              <h4 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
                <i className="fas fa-sliders text-emerald-600"></i> Matriz de Evaluación del Involucramiento (Actual vs. Deseado)
              </h4>
              <p className="text-xs text-slate-600 mb-6">
                Representación de brechas donde <strong>C</strong> indica nivel actual (Current) y <strong>D</strong> indica nivel deseado (Desired) según estándar PMBOK.
              </p>

              <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 p-4">
                <table className="w-full text-center text-xs text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-900 font-bold uppercase">
                      <th className="py-2.5 px-3 text-left">Interesado</th>
                      <th className="py-2.5 px-2">Desconocedor</th>
                      <th className="py-2.5 px-2">Resistente</th>
                      <th className="py-2.5 px-2">Neutral</th>
                      <th className="py-2.5 px-2">Alentador</th>
                      <th className="py-2.5 px-2">Comprometido</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="py-2.5 px-3 text-left font-bold text-slate-800">Gerente General (Sponsor)</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="bg-emerald-50 text-emerald-700 font-bold font-mono">C, D</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-left font-bold text-slate-800">Jefatura de Almacén</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="text-blue-600 font-mono font-bold">C</td>
                      <td className="bg-emerald-50 text-emerald-700 font-mono font-bold">D</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-left font-bold text-slate-800">Asesores de Ventas (Caja POS)</td>
                      <td></td>
                      <td></td>
                      <td className="text-amber-600 font-mono font-bold">C</td>
                      <td className="bg-emerald-50 text-emerald-700 font-mono font-bold">D</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-left font-bold text-slate-800">Proveedor de Servicios Cloud & TI</td>
                      <td></td>
                      <td></td>
                      <td className="text-slate-600 font-mono font-bold">C</td>
                      <td className="bg-emerald-50 text-emerald-700 font-mono font-bold">D</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-slate-200 pt-8 pb-12 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">FORMULACIÓN DE PROYECTOS TI</span> &bull; UNTELS
            </div>
            <p className="text-xs text-slate-400">
              Proceso de Identificación de Stakeholders &bull; INVERSIONES GRANDES IDEAS S.A.C (RUC: 20563735865) &bull; Inversiones Guido
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
}

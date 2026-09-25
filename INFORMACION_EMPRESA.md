# Perfil e Información Empresarial: Inversiones Guido

Documento consolidado con toda la información extraída a partir del análisis del documento de estudio y diagnóstico empresarial (*EMPRESA.md*).

---

## 1. Identificación y Datos Generales

| Campo | Detalle |
| :--- | :--- |
| **Razón Social (SUNAT)** | **INVERSIONES GRANDES IDEAS S.A.C** |
| **RUC** | **20563735865** |
| **Estado del Contribuyente** | **ACTIVO** |
| **Condición del Contribuyente** | **HABIDO** |
| **Nombre comercial de tienda** | Inversiones Guido (también referida como "Empresa de muebles Inversiones Guido") |
| **Representante Legal** | Gerente General (inscrito desde el 25 de julio de 2014) |
| **Rubro / Giro de negocio** | Fabricación, comercialización y venta de muebles para el hogar y oficina |
| **Ubicación geográfica** | Parque Industrial de Villa El Salvador, Provincia y Departamento de Lima, Perú |
| **Trayectoria** | Empresa constituida formalmente en 2014, con sólida reputación en el parque industrial de VES basada en la calidad de sus productos. |
| **Contexto del informe analizado** | Formulación de proyectos de TI y levantamiento de interesados desarrollado en conjunto con la Universidad Nacional Tecnológica de Lima Sur (UNTELS). |

---

## 2. Modelo de Negocio y Operaciones

### 2.1. Canal de Venta y Atención
- **Venta directa en tienda / visitas**: Cuenta con atención presencial de asesores y personal de ventas que brindan orientación a los compradores.
- **Servicio de despacho y entrega a domicilio**: Coordina la logística para transportar los muebles hasta la ubicación final del cliente.
- **Relaciones B2B**: Mantiene convenios y coordinación constante con socios comerciales y proveedores para el aprovisionamiento de insumos y materiales.

### 2.2. Áreas y Estructura Organizacional Detectada
- **Ventas y Atención al Cliente**: Encargada del contacto directo, asesoramiento, cotización y gestión de quejas/consultas.
- **Almacén e Inventario**: Responsable del control de existencias, clasificación por categorías de productos y recepción de mercadería.
- **Logística y Despacho**: Manejo de rutas, tiempos de entrega y estado de conservación de los muebles durante el transporte.
- **Administración y Finanzas**: Control de costos operativos, facturación, transacciones en moneda nacional (PEN - Soles) y toma de decisiones comerciales.

### 2.3. Estructura de Entidades del Negocio (Modelo de Datos / MER)
A partir de la arquitectura diseñada para la empresa, se identifican los pilares operacionales clave:
- `stores` (Sucursales / almacenes de la empresa)
- `users` (Personal, empleados y roles operativos)
- `customers` (Cartera de clientes)
- `categories` (Familias y categorías de muebles)
- `products` (Catálogo de muebles comercializados)
- `orders` (Órdenes de compra y transacciones de venta)
- `order_items` (Detalle de productos facturados por pedido)

---

## 3. Diagnóstico Empresarial: Problemática y Oportunidades de Mejora

A pesar de su reconocimiento y volumen comercial, Inversiones Guido afrontaba desafíos significativos derivados del crecimiento y la falta de digitalización:

### 3.1. Gestión Ineficiente de Inventarios
- La amplia diversidad de catálogo provocaba desajustes en el almacén:
  - **Quiebres de stock**: Agotamiento de productos clave con alta rotación.
  - **Sobrestock**: Acumulación excesiva de artículos de baja rotación.
- Elevados costos de almacenamiento y pérdida de rentabilidad por inmovilización de capital.

### 3.2. Procesos Manuales y Fragmentación de Información
- Registros en papel y documentos físicos dispersos (facturas, boletas, notas de entrega y kardex).
- Alta vulnerabilidad a errores humanos, pérdidas de comprobantes y lentitud en los tiempos de respuesta.
- Falta de una base de datos centralizada y segura.

### 3.3. Dificultad en la Toma de Decisiones Estratégicas
- Incapacidad para analizar tendencias de venta con rapidez.
- Falta de métricas precisas para optimizar precios, márgenes de ganancia y compras a proveedores.
- Dificultad para identificar oportunamente los productos más y menos rentables.

### 3.4. Relación y Fidelización con el Cliente
- Carencia de un historial de compras y registro de preferencias por cliente.
- Falta de personalización en la atención postventa y en el seguimiento de incidencias.

### 3.5. Impacto Operativo, Financiero y Ambiental
- **Económico**: Desperdicio en costos operativos, papeleo y almacenaje innecesario.
- **Ambiental**: Alto consumo de recursos en papel, consumo energético no optimizado y desaprovechamiento de rutas de transporte (lo que incrementaba emisiones de carbono).

---

## 4. Objetivos Estratégicos de la Empresa

Con la implementación de su nueva solución tecnológica, Inversiones Guido persigue los siguientes objetivos:

1. **Centralización y Eficiencia Operativa**:
   - Integrar los módulos de inventario, ventas, clientes y proveedores en una base de datos relacional centralizada (Microsoft SQL Server).
2. **Optimización Logística y Reducción de Costos**:
   - Reducir tiempos de entrega de pedidos y eliminar sobrecostos en almacenamiento.
3. **Servicio al Cliente Personalizado**:
   - Registrar hábitos de consumo y preferencias para fidelizar clientes y brindar soporte rápido y oportuno.
4. **Sostenibilidad Empresarial**:
   - Política de reducción progresiva del uso de papel (cero papel en comprobantes/registros), minimización del espacio físico requerido para archivo y planificación óptima de despachos para reducir la huella de carbono.
5. **Gobernanza y Seguridad de la Información**:
   - Resguardo íntegro de la información financiera, de stock y datos confidenciales de clientes.

---

## 5. Indicadores Clave de Desempeño (KPIs)

| Indicador | Definición Operacional para Inversiones Guido | Unidad de Medida |
| :--- | :--- | :--- |
| **Cifra de Ventas** | Total de ingresos generados por la venta de muebles | Soles (PEN) |
| **Costos Operativos** | Comparativa de gastos en almacén, logística y papelería | Soles (PEN) |
| **Tiempo de Entrega** | Plazo transcurrido entre la orden de compra y la recepción por el cliente | Días / Semanas |
| **Índice de Satisfacción del Cliente** | Percepción global del servicio, calidad del mueble y atención recibida | Escala de 1 a 5 (o 1 a 10) / % |
| **Rendimiento de Consultas** | Velocidad de acceso a stock y facturación en el sistema | Segundos |
| **Capacidad de Almacenamiento** | Volumen de datos comerciales y transaccionales centralizados | Gigabytes (GB) |
| **Personal Capacitado** | Número de colaboradores adiestrados en la operación de las nuevas herramientas | Cantidad de empleados |

---

## 6. Resultados del Estudio de Clientes (Encuesta de Satisfacción)

Durante el estudio de campo se aplicó una encuesta a una muestra de clientes de Inversiones Guido (con entre 86 y 94 respuestas válidas por pregunta), arrojando los siguientes datos cuantitativos:

```
[Atención y Asistencia en Ventas]
- Clientes asistidos por personal de ventas: 86.0% (Sí)

[Claridad en la Comunicación]
- Comunicación clara y comprensible: 84.0% (Sí) | 16.0% (No)

[Cumplimiento en Tiempos de Entrega]
- Entregas a tiempo dentro del plazo pactado: 96.8% (Sí) | 3.2% (No)

[Calidad y Estado del Producto Recibido]
- Llegaron sin problemas de calidad o daño físico: 64.9% (Sin problemas)
- Presentaron algún problema con la condición o calidad: 35.1% (Con observaciones)
```

### Conclusiones del Estudio de Percepción:
- **Puntos Fuertes**: Excelente cumplimiento en los plazos pactados de despacho (96.8%) y una atención presencial muy valorada y oportuna por parte del personal de ventas (86%).
- **Puntos Críticos a Mejorar**: Un 35.1% de incidencia en detalles de acabado, embalaje o transporte al momento de la entrega, sumado a una necesidad de mayor agilidad en la resolución de quejas y seguimiento posventa.

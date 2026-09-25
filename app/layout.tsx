import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infraestructura Tecnológica de Redes y Servicios Cloud POS - Inversiones Guido | UNTELS",
  description: "Formulación y Evaluación de Factibilidad para la Implementación de Infraestructura Tecnológica de Redes y Servicios Cloud POS en la MYPE Inversiones Guido (INVERSIONES GRANDES IDEAS S.A.C - RUC 20563735865) - UNTELS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="font-sans text-slate-800 min-h-screen bg-slate-50 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

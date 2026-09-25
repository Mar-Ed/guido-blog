import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INVERSIONES GRANDES IDEAS S.A.C (Inversiones Guido) - Formulación de Proyectos TI | UNTELS",
  description: "Proceso de Identificación de Stakeholders para el proyecto de TI de INVERSIONES GRANDES IDEAS S.A.C (RUC 20563735865 - Inversiones Guido) - Formulación de Proyectos TI (UNTELS)",
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

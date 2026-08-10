import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Space Grotesk → Headings (títulos, h1, h2, h3)
// Es una fuente geométrica, bold, moderna. Para títulos grandes.
const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// Inter → Body (texto normal, párrafos, botones, labels)
// Es la estándar de la industria, legible en cualquier tamaño.
const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Zarp! — Alquileres temporarios en Argentina',
  description:
    'Encontrá tu próximo alquiler temporario en Argentina. Propiedades verificadas, pagos seguros y chat directo con propietarios.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-primary">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}

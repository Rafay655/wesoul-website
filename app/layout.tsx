import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'WESOUL — Give Ideas a Soul.', description: 'Software and product engineering. WESOUL builds digital products, mobile applications and intelligent systems around real business needs.', icons: { icon: '/images/mark.png' } };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sav.works — AI Problem Solving',
  description:
    'Angels Company — AI problem solving, automated content workflows, and digital operations. Operations, Enterprises, AI, Logic.',
  openGraph: {
    title: 'sav.works — AI Problem Solving',
    description:
      'AI problem solving, automated content workflows, and digital operations.',
    siteName: 'sav.works',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-zinc-950 text-zinc-100 antialiased">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

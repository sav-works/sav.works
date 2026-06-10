import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { PHProvider } from './providers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '600'] })

export const metadata: Metadata = {
  title: 'sav.works — Operations · Enterprises · AI · Logic',
  description:
    'Angels Company — AI problem solving, automated content workflows, and digital operations. O-E-A-L: Operations, Enterprises, AI, Logic.',
  openGraph: {
    title: 'sav.works — Operations · Enterprises · AI · Logic',
    description:
      'Angels Company builds AI-powered operations, content automation, and digital infrastructure.',
    siteName: 'sav.works',
    type: 'website',
    url: 'https://sav.works',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} bg-zinc-950 text-zinc-100 antialiased`}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-YQZPQXE0K5"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YQZPQXE0K5');
        `}
      </Script>
      <body className="font-sans">
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  )
}

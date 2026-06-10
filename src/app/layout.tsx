import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { PHProvider } from './providers'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'sav.works — Build systems that handle more.',
  description:
    'AI-powered operations, content automation, and digital infrastructure. sav.works — handle more.',
  openGraph: {
    title: 'sav.works — Build systems that handle more.',
    description:
      'AI-powered operations, content automation, and digital infrastructure.',
    siteName: 'sav.works',
    type: 'website',
    url: 'https://sav.works',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sav.works — Build systems that handle more.',
    description:
      'AI-powered operations, content automation, and digital infrastructure.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://sav.works'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
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
      <body className="font-sans antialiased selection:bg-brand-200 selection:text-sav-900">
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  )
}

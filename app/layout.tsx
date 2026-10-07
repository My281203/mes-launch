import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { ACTIVE_THEME, THEMES } from './theme'
import './globals.css'

const sans = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'MES Systems — Production intelligence, connected',
  description: 'One connected MES platform for smarter, faster, and more transparent manufacturing.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme={ACTIVE_THEME} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <Script id="theme-preview" strategy="beforeInteractive">{`try{var t=new URLSearchParams(location.search).get("theme");if(${JSON.stringify(THEMES)}.indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}`}</Script>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

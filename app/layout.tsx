import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@/components/shell/dashboard.css'
import '@/components/dashboard/extra.css'
import { MotionPreferenceProvider } from '@/lib/motion/MotionPreferenceProvider'

export const metadata: Metadata = {
  title: 'Waypoint — Guidance for your next step',
  description: 'A considered path to career, higher-studies and employment guidance for IITM BS students.',
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
  colorScheme: 'light',
  themeColor: '#f5f0e6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('waypoint:reduce-motion')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.motion='reduced'}catch(e){}" }}/></head>
      <body className="antialiased">
        <MotionPreferenceProvider>{children}</MotionPreferenceProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './auth.css'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}

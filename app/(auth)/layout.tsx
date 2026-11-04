import type { Metadata } from 'next'
import './auth.css'
import { AuthFrame } from './AuthFrame'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthFrame>{children}</AuthFrame>
}

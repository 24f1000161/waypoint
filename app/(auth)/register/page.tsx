import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthFooter } from '@/components/auth/RouteHelpers'

export const metadata: Metadata = { title: 'Create an account — Waypoint', description: 'Choose how you want to use Waypoint.' }

export default function RegisterPage() {
  return <><p className="auth-eyebrow">Create an account</p><h1>Choose your <em>path.</em></h1><p className="auth-lede">Waypoint brings students and mentors together through considered, human-reviewed guidance.</p><div className="auth-notice-actions"><Link className="btn btn-accent" href="/register/student">I&apos;m a student <span aria-hidden="true">↗</span></Link><Link className="btn btn-outline" href="/register/mentor">I&apos;m a mentor <span aria-hidden="true">↗</span></Link></div><div className="auth-divider" aria-hidden="true"/><AuthFooter><p>Already have an account? <Link href="/sign-in">Sign in</Link></p></AuthFooter></>
}

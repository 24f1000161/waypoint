import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Signed in — Waypoint', robots: { index: false, follow: false } }
export default async function ContinuePage({ searchParams }: { searchParams: Promise<{ role?: string }> }) { const { role } = await searchParams; const safeRole = role === 'mentor' || role === 'admin' ? role : 'student'; return <section className="auth-notice"><h1>Signed in as <em>{safeRole}</em>.</h1><p>Dashboards arrive in a later phase.</p><Link className="auth-home-link" href="/">Back to home</Link></section> }

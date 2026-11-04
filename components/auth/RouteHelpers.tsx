import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function AuthBackLink() { return <Link className="auth-back-link" href="/">Back to home</Link> }
export function AuthFooter({ children }: { children: React.ReactNode }) { return <div className="auth-form-footer">{children}</div> }
export function AuthDivider() { return <div className="auth-divider" aria-hidden="true"/> }
export function BackToSignIn() { return <Link className="auth-copy-link" href="/sign-in"><ArrowLeft size={14} aria-hidden="true"/> Back to sign in</Link> }

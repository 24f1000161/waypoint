import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthShell'
import { ForgotPasswordForm } from '@/components/auth/AuthForms'
export const metadata: Metadata = { title: 'Reset your password — Waypoint', description: 'Request a Waypoint password reset.' }
export default function ForgotPasswordPage() { return <AuthShell><ForgotPasswordForm/></AuthShell> }

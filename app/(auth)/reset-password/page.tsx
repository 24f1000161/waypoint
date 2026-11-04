import type { Metadata } from 'next'
import { AuthShell } from '@/components/auth/AuthShell'
import { ResetPasswordForm } from '@/components/auth/AuthForms'
export const metadata: Metadata = { title: 'Set a new password — Waypoint', description: 'Set a new Waypoint password.' }
export default function ResetPasswordPage() { return <AuthShell><ResetPasswordForm/></AuthShell> }

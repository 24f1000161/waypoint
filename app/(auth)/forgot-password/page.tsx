import type { Metadata } from 'next'
import { ForgotPasswordForm } from '@/components/auth/AuthForms'
export const metadata: Metadata = { title: 'Reset your password — Waypoint', description: 'Request a Waypoint password reset.' }
export default function ForgotPasswordPage() { return <ForgotPasswordForm/> }

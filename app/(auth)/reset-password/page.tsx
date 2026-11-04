import type { Metadata } from 'next'
import { ResetPasswordForm } from '@/components/auth/AuthForms'
export const metadata: Metadata = { title: 'Set a new password — Waypoint', description: 'Set a new Waypoint password.' }
export default function ResetPasswordPage() { return <ResetPasswordForm/> }

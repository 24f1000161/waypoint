import type { Metadata } from 'next'
import { SignInForm } from '@/components/auth/AuthForms'

export const metadata: Metadata = { title: 'Sign in — Waypoint', description: 'Sign in to your Waypoint account.' }
export default function SignInPage() { return <SignInForm/> }

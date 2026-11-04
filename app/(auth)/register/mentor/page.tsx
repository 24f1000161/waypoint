import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/AuthForms'
export const metadata: Metadata = { title: 'Join as a mentor — Waypoint', description: 'Create a mentor account on Waypoint.' }
export default function MentorRegisterPage() { return <RegisterForm role="mentor"/> }

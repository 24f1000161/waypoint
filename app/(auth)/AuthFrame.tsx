'use client'
import { usePathname } from 'next/navigation'
import { AuthShell } from '@/components/auth/AuthShell'
export function AuthFrame({ children }: { children: React.ReactNode }) { const pathname = usePathname(); const steps = pathname.endsWith('/register/student') ? 'student' : pathname.endsWith('/register/mentor') ? 'mentor' : undefined; return <AuthShell steps={steps}>{children}</AuthShell> }

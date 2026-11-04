import type { AuthApi } from './api'
import type { AuthOutcome, AuthRequest, AuthRole } from './types'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const outcomeForEmail = (email: string): AuthOutcome | null => {
  if (email.startsWith('deactivated@')) return { kind: 'deactivated' }
  if (email.startsWith('pending@')) return { kind: 'pendingApproval' }
  if (email.startsWith('locked@')) return { kind: 'error', error: 'rateLimit' }
  if (email.startsWith('offline@')) return { kind: 'error', error: 'network' }
  return null
}
const roleForEmail = (email: string): AuthRole => email.startsWith('mentor@') ? 'mentor' : email.startsWith('admin@') ? 'admin' : 'student'

const latency = (email = '') => email.startsWith('slow@') ? 3000 : 600 + Math.round(Math.random() * 300)

export const mockAuth: AuthApi = {
  async signIn({ email, password }: AuthRequest) {
    await wait(latency(email))
    if (email.startsWith('wrong@') || password === 'wrong') return { kind: 'error', error: 'invalidCredentials' }
    return outcomeForEmail(email) ?? { kind: 'success', role: roleForEmail(email) }
  },
  async registerStudent({ email, rollNumber = '' }) {
    await wait(latency(email))
    if (rollNumber.trim() === 'NOTELIGIBLE') return { kind: 'notEligible' }
    if (rollNumber.trim() === 'TAKEN') return { kind: 'alreadyRegistered' }
    if (email.startsWith('verify@')) return { kind: 'checkEmail' }
    return { kind: 'accountCreated', role: 'student' }
  },
  async registerMentor({ email }) {
    await wait(latency(email))
    if (email.startsWith('noinvite@')) return { kind: 'mentorNotApproved' }
    if (email.startsWith('pending@')) return { kind: 'pendingApproval' }
    return { kind: 'accountCreated', role: 'mentor' }
  },
  async requestPasswordReset(email) {
    await wait(latency(email))
    return { kind: 'checkEmail' }
  },
  async resetPassword(token) {
    await wait(650)
    return token === 'expired' || token === 'invalid' ? { kind: 'error', error: 'server' } : { kind: 'success', role: 'student' }
  },
}

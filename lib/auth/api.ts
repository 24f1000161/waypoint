import type { AuthOutcome, AuthRequest } from './types'

export interface AuthApi {
  signIn(request: AuthRequest): Promise<AuthOutcome>
  registerStudent(request: AuthRequest): Promise<AuthOutcome>
  registerMentor(request: AuthRequest): Promise<AuthOutcome>
  requestPasswordReset(email: string): Promise<AuthOutcome>
  resetPassword(token: string, password: string): Promise<AuthOutcome>
}

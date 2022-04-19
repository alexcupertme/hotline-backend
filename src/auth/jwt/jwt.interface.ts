export interface IJwtAuthService {
    issueToken(sessionId: string): Promise<string>

    deactivateToken(sessionId: string): void

    renewToken(oldSessionId: string, newSessionId: string): Promise<string>
}
export const IJwtAuthService = Symbol('IJwtAuthService')

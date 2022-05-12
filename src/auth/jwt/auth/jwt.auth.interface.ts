export interface IJwtAuthService {
    issueToken(sessionID: string): Promise<string>

    deactivateTokenBySessionID(sessionID: string): void

    renewToken(oldSessionID: string, newSessionID: string): Promise<string>
}
export const IJwtAuthService = Symbol('IJwtAuthService')

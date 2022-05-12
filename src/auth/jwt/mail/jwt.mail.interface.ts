export interface IJwtMailService {
    issueToken(mailID: string, actionName: string): Promise<string>

    destroyToken(mailID: string): Promise<void>
}
export const IJwtMailService = Symbol('IJwtMailService')

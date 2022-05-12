export interface IJwtConfigService {
    get authTokenTTL(): number
    get authTokenPrefix(): string
    get authTokenSecret(): string

    get mailTokenTTL(): number
    get mailTokenPrefix(): string
    get mailTokenSecret(): string
}

export const IJwtConfigService = Symbol('IJwtConfigService')

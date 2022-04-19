export interface IJwtConfigService {
    get secret(): string
    get tokenPrefix(): string
    get ttl(): number
}

export const IJwtConfigService = Symbol('IJwtConfigService')

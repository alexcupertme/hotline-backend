export interface IThrottlingConfigService {
    get defaultTTL(): number

    get defaultLimit(): number

    get throttlingPrefix(): string
}

export const IThrottlingConfigService = Symbol('IThrottlingConfigService')

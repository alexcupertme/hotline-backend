export interface IRedisConfigService {
    get host(): string

    get port(): number

    get password(): string
}

export const IRedisConfigService = Symbol('IRedisConfigService')

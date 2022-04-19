export interface IPostgresConfigService {
    get host(): string

    get port(): number

    get username(): string

    get password(): string

    get database(): string
}

export const IPostgresConfigService = Symbol('IPostgresConfigService')

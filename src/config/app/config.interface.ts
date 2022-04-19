export interface IAppConfigService {
    get port(): number

    get appName(): string
}

export const IAppConfigService = Symbol('IAppConfigService')

export interface IBullConfigService {
    get queuePrefix(): string
}

export const IBullConfigService = Symbol('IBullConfigService')

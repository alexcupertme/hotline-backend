export interface IMailCommonConfigService {
    get appName(): string

    get senderAddress(): string

    get supportUrl(): string

    get supportEmail(): string

    get privacyPolicyUrl(): string

    get termsOfUseUrl(): string

    get callbackUrl(): string
}

export const IMailCommonConfigService = Symbol('IMailCommonConfigService')

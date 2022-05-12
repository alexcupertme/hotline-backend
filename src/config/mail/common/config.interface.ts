export interface IMailCommonConfigService {
    get appName(): string

    get senderAddress(): string

    get supportUrl(): string

    get supportEmail(): string

    get privacyPolicyUrl(): string

    get termsOfUseUrl(): string

    get mailVerificationCallbackUrl(): string

    get mailVerificationActionName(): string

    get resetPasswordCallbackUrl(): string

    get resetPasswordActionName(): string
}

export const IMailCommonConfigService = Symbol('IMailCommonConfigService')

export interface IMailCommonConfigService {
    get appName(): string

    get senderAddress(): string

    get siteUrl(): string

    get mailVerificationCallbackUrl(): string

    get mailVerificationActionName(): string

    get resetPasswordCallbackUrl(): string

    get resetPasswordActionName(): string

    get smtpPassword(): string

    get smtpHost(): string

    get smtpUser(): string

    get smtpPort(): number
}

export const IMailCommonConfigService = Symbol('IMailCommonConfigService')

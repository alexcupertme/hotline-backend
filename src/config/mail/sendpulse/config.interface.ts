export interface ISendpulseConfigService {
    get appUserId(): string

    get apiSecret(): string

    get baseUrl(): string

    get tokenPrefix(): string

    get oauthGateway(): string

    get smtpSendEmailGateway(): string

    get oauthGrantType(): string
}

export const ISendpulseConfigService = Symbol('ISendpulseConfigService')

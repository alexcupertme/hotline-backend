import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ISendpulseConfigService } from './config.interface'

@Injectable()
export class SendpulseConfigService implements ISendpulseConfigService {
    constructor(private configService: ConfigService) {}

    get oauthGateway(): string {
        return String(this.configService.get<string>(`sendpulse.oauthGateway`))
    }

    get smtpSendEmailGateway(): string {
        return String(this.configService.get<string>(`sendpulse.smtpSendEmailGateway`))
    }

    get tokenPrefix(): string {
        return String(this.configService.get<string>(`sendpulse.tokenPrefix`))
    }

    get appUserID(): string {
        return String(this.configService.get<string>(`sendpulse.appUserID`))
    }

    get apiSecret(): string {
        return String(this.configService.get<string>(`sendpulse.apiSecret`))
    }

    get baseUrl(): string {
        return String(this.configService.get<string>(`sendpulse.baseUrl`))
    }

    get oauthGrantType(): string {
        return String(this.configService.get<string>(`sendpulse.oauthGrantType`))
    }
}

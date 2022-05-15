import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IMailCommonConfigService } from './config.interface'

@Injectable()
export class MailCommonConfigService implements IMailCommonConfigService {
    constructor(private readonly configService: ConfigService) {}

    get smtpPassword(): string {
        return String(this.configService.get<string>(`mail-common.smtpPassword`))
    }

    get smtpHost(): string {
        return String(this.configService.get<string>(`mail-common.smtpHost`))
    }

    get smtpUser(): string {
        return String(this.configService.get<string>(`mail-common.smtpUser`))
    }

    get smtpPort(): number {
        return Number(this.configService.get<number>(`mail-common.smtpPort`))
    }

    get appName(): string {
        return String(this.configService.get<string>(`mail-common.appName`))
    }

    get senderAddress(): string {
        return String(this.configService.get<string>(`mail-common.senderAddress`))
    }

    get siteUrl(): string {
        return String(this.configService.get<string>(`mail-common.siteUrl`))
    }

    get mailVerificationCallbackUrl(): string {
        return String(this.configService.get<string>(`mail-common.mailVerificationCallbackUrl`))
    }

    get mailVerificationActionName(): string {
        return String(this.configService.get<string>(`mail-common.mailVerificationActionName`))
    }

    get resetPasswordCallbackUrl(): string {
        return String(this.configService.get<string>(`mail-common.resetPasswordCallbackUrl`))
    }

    get resetPasswordActionName(): string {
        return String(this.configService.get<string>(`mail-common.resetPasswordActionName`))
    }
}

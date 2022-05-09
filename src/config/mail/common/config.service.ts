import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IMailCommonConfigService } from './config.interface'

@Injectable()
export class MailCommonConfigService implements IMailCommonConfigService {
    constructor(private configService: ConfigService) {}

    get appName(): string {
        return String(this.configService.get<string>(`mail-common.appName`))
    }

    get senderAddress(): string {
        return String(this.configService.get<string>(`mail-common.senderAddress`))
    }

    get supportUrl(): string {
        return String(this.configService.get<string>(`mail-common.supportUrl`))
    }

    get supportEmail(): string {
        return String(this.configService.get<string>(`mail-common.supportEmail`))
    }

    get privacyPolicyUrl(): string {
        return String(this.configService.get<string>(`mail-common.privacyPolicyUrl`))
    }

    get termsOfUseUrl(): string {
        return String(this.configService.get<string>(`mail-common.termsOfUseUrl`))
    }

    get callbackUrl(): string {
        return String(this.configService.get<string>(`mail-common.callbackUrl`))
    }
}

import { Inject } from '@nestjs/common'
import { IMailCommonConfigService } from './../../config/mail/common/config.interface'
import { MailProducer } from './../../job/mail/producer.service'
import { IMailVerificationService } from './mail-verification.interface'
import { MailVerificationTemplate } from './mail-verification.template'

export class MailVerificationService implements IMailVerificationService {
    constructor(
        @Inject(IMailCommonConfigService) private mailCommonConfigService: IMailCommonConfigService,
        private mailProducer: MailProducer
    ) {}

    async sendMail(email: string, name: string): Promise<boolean> {
        const content = MailVerificationTemplate(
            name,
            this.mailCommonConfigService.supportEmail,
            this.mailCommonConfigService.supportUrl,
            this.mailCommonConfigService.callbackUrl,
            this.mailCommonConfigService.appName,
            this.mailCommonConfigService.privacyPolicyUrl,
            this.mailCommonConfigService.termsOfUseUrl
        )

        await this.mailProducer.createTask({
            email: {
                to: [
                    {
                        name,
                        email,
                    },
                ],
                from: {
                    name: this.mailCommonConfigService.appName,
                    email: this.mailCommonConfigService.senderAddress,
                },
                html: Buffer.from(content).toString('base64'),
                text: content,
                subject: 'Verification',
            },
        })
        return true
    }
}

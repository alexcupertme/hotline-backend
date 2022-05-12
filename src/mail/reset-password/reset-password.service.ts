import { IJwtMailService } from '@auth/jwt/mail/jwt.mail.interface'
import { MailsRepository } from '@models/mail/mail.repository'
import { Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IMailCommonConfigService } from './../../config/mail/common/config.interface'
import { MailProducer } from './../../job/mail/producer.service'
import { IResetPasswordMailingService } from './reset-password.interface'
import { ResetPasswordTemplate } from './reset-password.template'

export class ResetPasswordMailingService implements IResetPasswordMailingService {
    constructor(
        @InjectRepository(MailsRepository)
        private readonly mailsRepository: MailsRepository,
        @Inject(IMailCommonConfigService) private mailCommonConfigService: IMailCommonConfigService,
        @Inject(IJwtMailService) private jwtMailService: IJwtMailService,
        private mailProducer: MailProducer
    ) {}

    async sendMail(email: string, userID: string, userIP: string, name: string): Promise<boolean> {
        await this.mailsRepository.update(
            {
                isActionCompleted: false,
                actionName: this.mailCommonConfigService.resetPasswordActionName,
                email,
            },
            { isActionTerminated: true }
        )

        const mail = await this.mailsRepository.createEntity({
            email,
            actionName: this.mailCommonConfigService.resetPasswordActionName,
        })

        const token = await this.jwtMailService.issueToken(mail.id, mail.actionName)

        const content = ResetPasswordTemplate(
            name,
            email,
            userID,
            userIP,
            this.mailCommonConfigService.supportEmail,
            this.mailCommonConfigService.supportUrl,
            `${this.mailCommonConfigService.resetPasswordCallbackUrl}?token=${token}`,
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
                subject: 'Reset password',
            },
        })
        return true
    }

    async finishPasswordReset(mailID: string): Promise<void> {
        await this.mailsRepository.update({ id: mailID }, { isActionCompleted: true })

        this.jwtMailService.destroyToken(mailID)
    }
}
//TODO: Refactor this shit

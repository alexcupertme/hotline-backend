import { IJwtMailService } from '@auth/jwt/mail/jwt.mail.interface'
import { MailsRepository } from '@models/mail/mail.repository'
import { MailEntity } from '@models/mail/serializers/mail.serializer'
import { UserEntity } from '@models/user/serializer/user.serializer'
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

    async sendMail(email: string, user: UserEntity, userIP: string, name: string): Promise<boolean> {
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
            user,
        })

        const token = await this.jwtMailService.issueToken(mail.id, mail.actionName)

        const content = ResetPasswordTemplate(
            name,
            email,
            user.id,
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

    async finishPasswordReset(mail: MailEntity): Promise<void> {
        await this.mailsRepository.updateEntity(mail, { isActionCompleted: true })

        this.jwtMailService.destroyToken(mail.id)
    }
}
//TODO: Refactor this shit

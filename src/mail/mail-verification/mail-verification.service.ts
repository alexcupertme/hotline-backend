import { IJwtMailService } from '@auth/jwt/mail/jwt.mail.interface'
import { MailEntity } from '@models/mail/serializers/mail.serializer'
import { UserEntity } from '@models/user/serializer/user.serializer'
import { Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IMailCommonConfigService } from './../../config/mail/common/config.interface'
import { MailProducer } from './../../job/mail/producer.service'
import { MailsRepository } from './../../models/mail/mail.repository'
import { IMailVerificationService, SendMailResponse } from './mail-verification.interface'
import { MailVerificationTemplate } from './mail-verification.template'

export class MailVerificationService implements IMailVerificationService {
    constructor(
        @InjectRepository(MailsRepository)
        private readonly mailsRepository: MailsRepository,
        @Inject(IMailCommonConfigService) private mailCommonConfigService: IMailCommonConfigService,
        @Inject(IJwtMailService) private jwtMailService: IJwtMailService,
        private mailProducer: MailProducer
    ) {}

    async sendMail(email: string, name: string, user: UserEntity): Promise<SendMailResponse> {
        await this.mailsRepository.update(
            {
                isActionCompleted: false,
                actionName: this.mailCommonConfigService.mailVerificationActionName,
                email,
            },
            { isActionTerminated: true }
        )

        const mail = await this.mailsRepository.createEntity({
            email,
            actionName: this.mailCommonConfigService.mailVerificationActionName,
            user: user,
        })

        const token = await this.jwtMailService.issueToken(mail.id, mail.actionName)

        const content = MailVerificationTemplate(
            name,
            this.mailCommonConfigService.supportEmail,
            this.mailCommonConfigService.supportUrl,
            `${this.mailCommonConfigService.mailVerificationCallbackUrl}?token=${token}`,
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
                subject: 'Mail verification',
            },
        })

        return {
            success: true,
            mailID: mail.id,
            token,
        }
    }

    async finishVerification(mail: MailEntity) {
        await this.mailsRepository.updateEntity(mail, { isActionCompleted: true })

        this.jwtMailService.destroyToken(mail.id)
    }
}

//TODO: Refactor this shit

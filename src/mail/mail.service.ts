import { IJwtMailService } from '@auth/jwt/mail/jwt.mail.interface'
import { IMailCommonConfigService } from '@config/mail/common/config.interface'
import { MailsRepository } from '@models/mail/mail.repository'
import { MailEntity } from '@models/mail/serializers/mail.serializer'
import { User } from '@models/user/entity/user.entity'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MailProducer } from 'job/mail/producer.service'
import { RequiredData } from './../job/mail/typings'
import { IMailService, SendMailResponse } from './mail.type'

export type MailData = {
    actionName: string
    senderName: string
    user: User
    email: string
    callbackUrl: string
}

@Injectable()
export class MailService implements IMailService {
    constructor(
        @InjectRepository(MailsRepository)
        private readonly mailsRepository: MailsRepository,
        @Inject(IMailCommonConfigService) protected readonly mailCommonConfigService: IMailCommonConfigService,
        @Inject(IJwtMailService) private readonly jwtMailService: IJwtMailService,
        private readonly mailProducer: MailProducer<RequiredData>
    ) {}

    protected async createMail<T extends RequiredData & MailData>(data: T): Promise<SendMailResponse> {
        await this.mailsRepository.tryTerminateUserActiveAction(data.actionName, data.email)

        const mail = await this.mailsRepository.createEntity({
            email: data.email,
            actionName: data.actionName,
            user: data.user,
        })

        const token = await this.jwtMailService.issueToken(mail.id, data.actionName)

        await this.mailProducer.createTask({
            template: data.actionName,
            context: {
                appName: this.mailCommonConfigService.appName,
                siteUrl: this.mailCommonConfigService.siteUrl,
                email: data.email,
                callbackUrl: `${data.callbackUrl}?token=${token}`, // TODO: Change this to function / object which generates string url from object (you can pass the query params as object)
                ...data.context,
            },
            to: data.email,
            from: `${data.senderName} <${this.mailCommonConfigService.senderAddress}>`,
            subject: data.subject,
            sender: this.mailCommonConfigService.senderAddress,
        })

        return {
            success: true,
            mailID: mail.id,
            token,
        }
    }

    public async finishAction(mail: MailEntity) {
        await this.mailsRepository.updateEntity(mail, { isActionCompleted: true })

        this.jwtMailService.destroyToken(mail.id)
    }
}

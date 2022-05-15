import { UserEntity } from '@models/user/serializer/user.serializer'
import { Injectable } from '@nestjs/common'
import { SendMailResponse } from '../mail.type'
import { MailData, MailService } from './../mail.service'
import { IMailVerificationMailingService } from './mail-verification.interface'
import { MailVerificationTemplate } from './mail-verification.type'

@Injectable()
export class MailVerificationMailingService extends MailService implements IMailVerificationMailingService {
    async sendMail(email: string, name: string, user: UserEntity): Promise<SendMailResponse> {
        return await this.createMail<MailVerificationTemplate & MailData>({
            context: {
                name,
            },
            subject: 'Mail Verification',
            actionName: this.mailCommonConfigService.mailVerificationActionName,
            email,
            senderName: 'Hotlinetrade Support',
            user,
            callbackUrl: this.mailCommonConfigService.mailVerificationCallbackUrl,
        })
    }
}

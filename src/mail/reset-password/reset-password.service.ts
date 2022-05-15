import { UserEntity } from '@models/user/serializer/user.serializer'
import { Injectable } from '@nestjs/common'
import { MailData, MailService } from './../mail.service'
import { SendMailResponse } from './../mail.type'
import { IResetPasswordMailingService } from './reset-password.interface'
import { ResetPasswordTemplate } from './reset-password.type'

@Injectable()
export class ResetPasswordMailingService extends MailService implements IResetPasswordMailingService {
    async sendMail(email: string, user: UserEntity, ip: string, name: string): Promise<SendMailResponse> {
        return await this.createMail<ResetPasswordTemplate & MailData>({
            context: {
                name,
                ip,
                email,
                callbackUrl: this.mailCommonConfigService.resetPasswordCallbackUrl,
                userID: user.id,
            },
            subject: 'Reset password',
            actionName: this.mailCommonConfigService.resetPasswordActionName,
            email,
            senderName: 'Hotlinetrade Guard',
            user,
            callbackUrl: this.mailCommonConfigService.resetPasswordCallbackUrl,
        })
    }
}

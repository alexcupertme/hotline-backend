import { MailEntity } from '@models/mail/serializers/mail.serializer'
import { UserEntity } from '@models/user/serializer/user.serializer'
export interface IResetPasswordMailingService {
    sendMail(email: string, user: UserEntity, userIP: string, name: string): Promise<boolean>
    finishPasswordReset(mail: MailEntity): Promise<void>
}

export const IResetPasswordMailingService = Symbol('IResetPasswordMailingService')

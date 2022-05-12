import { MailEntity } from '@models/mail/serializers/mail.serializer'
import { UserEntity } from '@models/user/serializer/user.serializer'
export type SendMailResponse = {
    success: boolean
    mailID: string
    token: string
}

export interface IMailVerificationService {
    sendMail(email: string, name: string, user: UserEntity): Promise<SendMailResponse>
    finishVerification(mail: MailEntity): Promise<void>
}

export const IMailVerificationService = Symbol('IMailVerificationService')

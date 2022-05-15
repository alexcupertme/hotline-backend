import { MailEntity } from '@models/mail/serializers/mail.serializer'
export interface IMailService {
    finishAction(mail: MailEntity): Promise<void>
}

export type SendMailResponse = {
    success: boolean
    mailID: string
    token: string
}

import { RequiredData } from './../../job/mail/typings'
export type MailVerificationTemplate = RequiredData & {
    context: {
        name: string
    }
    subject: 'Mail Verification'
}

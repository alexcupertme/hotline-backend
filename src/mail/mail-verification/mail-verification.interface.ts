export type SendMailResponse = {
    success: boolean
    mailID: string
    token: string
}

export interface IMailVerificationService {
    sendMail(email: string, name: string): Promise<SendMailResponse>
    finishVerification(mailID: string): Promise<void>
}

export const IMailVerificationService = Symbol('IMailVerificationService')

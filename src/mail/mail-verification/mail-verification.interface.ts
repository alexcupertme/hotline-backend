export interface IMailVerificationService {
    sendMail(email: string, name: string): Promise<boolean>
}

export const IMailVerificationService = Symbol('IMailVerificationService')

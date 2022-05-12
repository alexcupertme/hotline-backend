export interface IResetPasswordMailingService {
    sendMail(email: string, name: string, userID: string, ip: string): Promise<boolean>
    finishPasswordReset(mailID: string): Promise<void>
}

export const IResetPasswordMailingService = Symbol('IResetPasswordMailingService')

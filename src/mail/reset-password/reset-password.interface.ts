import { UserEntity } from '@models/user/serializer/user.serializer'
import { SendMailResponse } from '../mail.type'
import { IMailService } from './../mail.type'
export interface IResetPasswordMailingService extends IMailService {
    sendMail(email: string, user: UserEntity, userIP: string, name: string): Promise<SendMailResponse>
}

export const IResetPasswordMailingService = Symbol('IResetPasswordMailingService')

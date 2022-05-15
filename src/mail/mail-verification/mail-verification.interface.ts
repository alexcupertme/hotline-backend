import { UserEntity } from '@models/user/serializer/user.serializer'
import { SendMailResponse } from '../mail.type'
import { IMailService } from './../mail.type'

export interface IMailVerificationMailingService extends IMailService {
    sendMail(email: string, name: string, user: UserEntity): Promise<SendMailResponse>
}

export const IMailVerificationMailingService = Symbol('IMailVerificationMailingService')

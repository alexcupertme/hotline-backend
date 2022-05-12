import { Mail } from '@models/mail/entity/mail.entity'
export interface IUserShown {
    email: string
    nickname: string
    firstName: string
    lastName: string
}

export interface IUser extends IUserShown {
    password: string
    sessionID: string
    mails: Mail[]
    isMailVerified: boolean
}

/* eslint-disable @typescript-eslint/indent */

import { RequiredData } from '../../job/mail/typings'
export type ResetPasswordTemplate = RequiredData & {
    context: {
        name: string
        email: string
        userID: string
        ip: string
        callbackUrl: string
    }
    subject: 'Reset password'
}

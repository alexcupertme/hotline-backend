import { ModelEntity } from '@core/serializers/model.serializer'
import { Mail } from '@models/mail/entity/mail.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { IUser } from './../interface/user.interface'

export class UserEntity extends ModelEntity implements IUser {
    constructor() {
        super()
    }

    @ApiProperty()
    email: string

    @ApiProperty()
    nickname: string

    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @Exclude({ toPlainOnly: true })
    sessionID: string

    @Exclude({ toPlainOnly: true })
    mails: Mail[]

    @Exclude({ toPlainOnly: true })
    isMailVerified: boolean

    @Exclude({ toPlainOnly: true })
    password: string
}

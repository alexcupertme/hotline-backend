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

    @Exclude({ toClassOnly: true })
    sessionID: string

    @Exclude({ toClassOnly: true })
    mails: Mail[]

    @Exclude({ toClassOnly: true })
    isMailVerified: boolean

    @Exclude({ toClassOnly: true })
    password: string
}

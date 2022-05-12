import { ModelEntity } from '@core/serializers/model.serializer'
import { ApiProperty } from '@nestjs/swagger'
import { Entity } from 'typeorm'
import { IMail } from './../interface/mail.interface'

@Entity({ name: 'mails' })
export class MailEntity extends ModelEntity implements IMail {
    @ApiProperty()
    actionName: string

    @ApiProperty()
    isActionCompleted: boolean

    @ApiProperty()
    isActionTerminated: boolean

    @ApiProperty()
    email: string
}

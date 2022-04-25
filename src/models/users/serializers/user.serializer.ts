import { ModelEntity } from '@core/serializers/model.serializer'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IUser } from '../interfaces/user.interface'

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps']
export const extendedUserGroupsForSerializing: string[] = [...defaultUserGroupsForSerializing]
export const allUserGroupsForSerializing: string[] = [...extendedUserGroupsForSerializing, 'user.password']

export class UserEntity extends ModelEntity implements IUser {
    @ApiProperty()
    id: string

    @ApiProperty()
    email: string

    @ApiProperty()
    nickname: string

    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @ApiProperty()
    sessionId: string | undefined

    @Expose({ groups: ['user.password'] })
    password: string

    @Expose({ groups: ['user.timestamps'] })
    createdAt: Date

    @Expose({ groups: ['user.timestamps'] })
    updatedAt: Date
}

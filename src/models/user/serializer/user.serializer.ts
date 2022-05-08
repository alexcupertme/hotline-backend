import { IModelEntity } from '@core/serializers/model.serializer'
import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IUserSerialized } from './../interface/user.interface'

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps']
export const extendedUserGroupsForSerializing: string[] = [...defaultUserGroupsForSerializing]
export const allUserGroupsForSerializing: string[] = [...extendedUserGroupsForSerializing, 'user.password']

export class UserEntity implements IModelEntity, IUserSerialized {
    constructor() {}

    @ApiProperty()
    id!: string

    @ApiProperty()
    email!: string

    @ApiProperty()
    nickname!: string

    @ApiProperty()
    firstName!: string

    @ApiProperty()
    lastName!: string

    @ApiProperty()
    sessionId!: string

    @Expose({ groups: ['user.password'] })
    password?: string

    @Expose({ groups: ['user.timestamps'] })
    createdAt?: Date

    @Expose({ groups: ['user.timestamps'] })
    updatedAt?: Date
}

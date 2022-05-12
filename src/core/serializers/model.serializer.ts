import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export const defaultUserGroupsForSerializing: string[] = []
export const extendedUserGroupsForSerializing: string[] = [...defaultUserGroupsForSerializing, 'user.timestamps']
export const allUserGroupsForSerializing: string[] = [...extendedUserGroupsForSerializing, 'user.password']

export interface IModelEntity {
    id: string
    createdAt: Date | undefined
    updatedAt: Date | undefined
}

export class ModelEntity implements IModelEntity {
    @ApiProperty()
    id: string

    @Expose({ groups: ['user.timestamps'], toClassOnly: true })
    createdAt: Date | undefined

    @Expose({ groups: ['user.timestamps'], toClassOnly: true })
    updatedAt: Date | undefined
}

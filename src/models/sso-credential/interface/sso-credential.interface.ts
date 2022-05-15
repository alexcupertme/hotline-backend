import { User } from '@models/user/entity/user.entity'
import { IModelEntity } from './../../../core/serializers/model.serializer'

export interface ISSOCredential extends IModelEntity {
    user: User
    providerName: string
    providedID: string
}

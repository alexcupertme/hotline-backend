import { instanceToPlain, plainToClass } from 'class-transformer'
import { EntityRepository } from 'typeorm'
import { ModelRepository } from '../model.repository'
import { User } from './entities/user.entity'
import { allUserGroupsForSerializing, UserEntity } from './serializers/user.serializer'

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
    transform(model: User): UserEntity {
        const tranformOptions = {
            groups: allUserGroupsForSerializing,
        }
        return plainToClass(UserEntity, instanceToPlain(model, tranformOptions), tranformOptions)
    }

    transformMany(models: User[]): UserEntity[] {
        return models.map((model) => this.transform(model))
    }
}

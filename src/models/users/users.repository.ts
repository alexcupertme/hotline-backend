import { hash } from 'argon2'
import { instanceToPlain, plainToClass } from 'class-transformer'
import { EntityRepository } from 'typeorm'
import * as uuid from 'uuid'
import { ModelRepository } from '../model.repository'
import { CreateUserDto } from './dto/create.user.dto'
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

    async createUser(user: CreateUserDto) {
        user.password = await hash(user.password)
        return await this.createEntity({ ...user, sessionId: uuid.v4() })
    }

    async refreshSession(user: UserEntity) {
        return await this.updateEntity(user, { sessionId: uuid.v4() })
    }
}

import { hash } from 'argon2'
import { instanceToPlain, plainToClass } from 'class-transformer'
import { EntityRepository } from 'typeorm'
import * as uuid from 'uuid'
import { CreateUserRequestDto } from '../auth/dto/create.user.dto'
import { ModelRepository } from '../model.repository'
import { User } from './entity/user.entity'
import { allUserGroupsForSerializing, UserEntity } from './serializer/user.serializer'

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

    async createUser(user: CreateUserRequestDto) {
        user.password = await hash(user.password)
        return await this.createEntity({ ...user, sessionId: uuid.v4() })
    }

    async refreshSession(user: UserEntity): Promise<UserEntity> {
        const sessionId = uuid.v4()
        const userEntity = (await this.updateEntity(user, { sessionId }))!

        return {
            ...userEntity,
            sessionId,
        }
    }
}

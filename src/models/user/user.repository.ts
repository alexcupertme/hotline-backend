import { hash } from 'argon2'
import { plainToInstance } from 'class-transformer'
import { EntityRepository } from 'typeorm'
import * as uuid from 'uuid'
import { RegisterRequestDto } from '../auth/dto/register.auth.dto'
import { ModelRepository } from '../model.repository'
import { User } from './entity/user.entity'
import { UserEntity } from './serializer/user.serializer'

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
    override transform(model: User): UserEntity {
        return plainToInstance(UserEntity, model)
    }

    override transformMany(models: User[]): UserEntity[] {
        return models.map((model) => this.transform(model))
    }

    async createUser(user: RegisterRequestDto) {
        user.password = await hash(user.password)
        return await this.createEntity({ ...user, sessionID: uuid.v4() })
    }

    async refreshSession(user: UserEntity): Promise<UserEntity> {
        const sessionID = uuid.v4()
        const userEntity = (await this.updateEntity(user, { sessionID }))!

        return {
            ...userEntity,
            sessionID,
        }
    }

    async terminateSession(user: UserEntity): Promise<UserEntity> {
        const userEntity = (await this.updateEntity(user, { sessionID: '' }))!

        return userEntity
    }

    async changePassword(user: UserEntity, password: string) {
        const userEntity = (await this.updateEntity(user, { sessionID: '', password: await hash(password) }))!

        return userEntity
    }
}

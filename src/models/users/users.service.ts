import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from './dto/create.user.dto'
import { UserEntity } from './serializers/user.serializer'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository
    ) {}
    async create(inputs: CreateUserDto): Promise<UserEntity> {
        return await this.usersRepository.createEntity(inputs)
    }
}

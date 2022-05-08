import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from './user.repository'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository
    ) {}
}

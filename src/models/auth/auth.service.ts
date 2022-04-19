import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from '../users/dto/create.user.dto'
import { UserEntity } from '../users/serializers/user.serializer'
import { UsersRepository } from '../users/users.repository'
import { IJwtAuthService } from './../../auth/jwt/jwt.interface'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        @Inject(IJwtAuthService) private readonly jwtAuthService: IJwtAuthService
    ) {}

    async register(dto: CreateUserDto) {
        const oldUser = await this.usersRepository.findOne({
            email: dto.email,
        })
        if (oldUser) throw new BadRequestException('User with this email already exist')
        const newUser = await this.usersRepository.createUser(dto)
        return { ...newUser, token: await this.jwtAuthService.issueToken(newUser.sessionId) }
    }

    async login(user: UserEntity) {
        const fetchedUser = await this.usersRepository.refreshSession(user)
        return {
            token: await this.jwtAuthService.renewToken(user.sessionId, fetchedUser.sessionId),
        }
    }

    async logout(user: UserEntity) {
        await this.usersRepository.updateEntity(user, { sessionId: null })
        this.jwtAuthService.deactivateToken(user.sessionId)
    }
}

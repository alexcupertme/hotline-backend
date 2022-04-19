import { InvalidEmailOrPasswordException } from '@core/exceptions/invalid-email-or-password.exception'
import { BadRequestException, Injectable } from '@nestjs/common'
import { hash, verify } from 'argon2'
import * as uuid from 'uuid'
import { JwtAuthService } from '../../auth/jwt/jwt.service'
import { CreateUserDto } from '../users/dto/create.user.dto'
import { LoginUserDto } from '../users/dto/login.user.dto'
import { UserEntity } from '../users/serializers/user.serializer'
import { UsersRepository } from '../users/users.repository'

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository, private readonly jwtAuthService: JwtAuthService) {}

    async register(dto: CreateUserDto) {
        const oldUser = await this.usersRepository.findOne({
            email: dto.email,
        })
        if (oldUser) throw new BadRequestException('User with this email already exist')
        dto.password = await hash(dto.password)
        const genUUID = uuid.v4()
        const newUser = await this.usersRepository.createEntity({ ...dto, sessionId: genUUID })
        newUser.token = await this.jwtAuthService.issueToken(genUUID)
        return newUser
    }

    async login(dto: LoginUserDto) {
        const oldUser = await this.usersRepository.findOne({
            email: dto.email,
        })
        if (!oldUser) throw new InvalidEmailOrPasswordException()
        const isPasswordEqual = await verify(oldUser.password, dto.password)
        if (!isPasswordEqual) throw new InvalidEmailOrPasswordException()
        const genUUID = uuid.v4()
        await this.usersRepository.updateEntity(oldUser, { sessionId: genUUID })
        return {
            token: await this.jwtAuthService.renewToken(oldUser.sessionId, genUUID),
        }
    }

    async logout(user: UserEntity) {
        await this.usersRepository.updateEntity(user, { sessionId: null })
        return await this.jwtAuthService.deactivateToken(user.sessionId)
    }
}

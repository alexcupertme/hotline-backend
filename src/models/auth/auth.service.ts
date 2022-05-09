import { IJwtAuthService } from '@auth/jwt/jwt.interface'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/serializer/user.serializer'
import { UsersRepository } from '../user/user.repository'
import { IMailVerificationService } from './../../mail/mail-verification/mail-verification.interface'
import { CreateUserRequestDto } from './dto/create.user.dto'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        @Inject(IJwtAuthService) private readonly jwtAuthService: IJwtAuthService,
        @Inject(IMailVerificationService) private readonly mailVerificationService: IMailVerificationService
    ) {}

    async register(dto: CreateUserRequestDto) {
        const oldUser = await this.usersRepository.findOne({
            email: dto.email,
        })
        if (oldUser) throw new BadRequestException('User with this email already exist')
        const newUser = await this.usersRepository.createUser(dto)

        await this.mailVerificationService.sendMail(dto.email, `${dto.firstName} ${dto.lastName}`)

        return { ...newUser, token: await this.jwtAuthService.issueToken(newUser.sessionId) }
    }

    async login(user: UserEntity) {
        const fetchedUser = await this.usersRepository.refreshSession(user)

        return {
            token: await this.jwtAuthService.renewToken(user.sessionId, fetchedUser.sessionId),
        }
    }

    async logout(user: UserEntity) {
        await this.usersRepository.updateEntity(user, { sessionId: '' })
        this.jwtAuthService.deactivateToken(user.sessionId)
    }
}

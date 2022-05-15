import { IJwtAuthService } from '@auth/jwt/auth/jwt.auth.interface'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/serializer/user.serializer'
import { UsersRepository } from '../user/user.repository'
import { IMailVerificationMailingService } from './../../mail/mail-verification/mail-verification.interface'
import { IResetPasswordMailingService } from './../../mail/reset-password/reset-password.interface'
import { MailEntity } from './../mail/serializers/mail.serializer'
import { RegisterRequestDto } from './dto/register.auth.dto'
import { ResetPasswordRequestDto } from './dto/reset-password.auth.dto'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        @Inject(IJwtAuthService) private readonly jwtAuthService: IJwtAuthService,
        @Inject(IMailVerificationMailingService)
        private readonly mailVerificationService: IMailVerificationMailingService,
        @Inject(IResetPasswordMailingService) private readonly resetPasswordMailingService: IResetPasswordMailingService
    ) {}

    async register(dto: RegisterRequestDto) {
        const oldUser = await this.usersRepository.findOne({
            email: dto.email,
        })
        if (oldUser) throw new BadRequestException('User with this email already exists')
        const newUser = await this.usersRepository.createUser(dto)

        await this.mailVerificationService.sendMail(dto.email, `${dto.firstName} ${dto.lastName}`, newUser)

        return newUser
    }

    async login(user: UserEntity) {
        const fetchedUser = await this.usersRepository.refreshSession(user)

        return {
            token: await this.jwtAuthService.renewToken(user.sessionID, fetchedUser.sessionID),
        }
    }

    async logout(user: UserEntity) {
        await this.usersRepository.terminateSession(user)
        this.jwtAuthService.deactivateTokenBySessionID(user.sessionID)
    }

    async verifyMail(user: UserEntity, mail: MailEntity) {
        if (user.isMailVerified) throw new BadRequestException('Your account already verified! Please, re-login')

        await this.usersRepository.updateEntity(user, { isMailVerified: true })
        await this.mailVerificationService.finishAction(mail)

        return { success: true }
    }

    async requestResetPassword(user: UserEntity, ip: string) {
        await this.resetPasswordMailingService.sendMail(user.email, user, ip, `${user.firstName} ${user.lastName}`)
        return { success: true }
    }

    async resetPassword(dto: ResetPasswordRequestDto, user: UserEntity, mail: MailEntity) {
        await this.usersRepository.changePassword(user, dto.password)

        await this.resetPasswordMailingService.finishAction(mail)

        return { success: true }
    }
}

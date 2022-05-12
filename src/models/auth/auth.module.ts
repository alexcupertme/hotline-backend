import { JwtAuthModule } from '@auth/jwt/auth/jwt.auth.module'
import { JwtConfigModule } from '@config/jwt/config.module'
import { MailsRepository } from '@models/mail/mail.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from '../user/user.repository'
import { MailVerificationModule } from './../../mail/mail-verification/mail-verification.module'
import { ResetPasswordMailingModule } from './../../mail/reset-password/reset-password.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAuthStrategy } from './strategies/jwt.auth.strategy'
import { JwtMailStrategy } from './strategies/jwt.mail.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersRepository]),
        TypeOrmModule.forFeature([MailsRepository]),
        JwtAuthModule,
        JwtConfigModule,
        MailVerificationModule,
        ResetPasswordMailingModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtAuthStrategy, JwtMailStrategy, LocalStrategy],
})
export class AuthModule {}

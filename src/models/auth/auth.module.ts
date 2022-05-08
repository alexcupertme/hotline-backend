import { JwtConfigModule } from '@config/jwt/config.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtProviderModule } from '../../auth/jwt/jwt.module'
import { UsersRepository } from '../user/user.repository'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository]), JwtProviderModule, JwtConfigModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}

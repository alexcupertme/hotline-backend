import { InvalidEmailOrPasswordException } from '@core/exceptions/invalid-email-or-password.exception'
import { AbstractPassportStrategy } from '@core/strategies/passport/passport.abstract'
import { UsersRepository } from '@models/users/users.repository'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { verify } from 'argon2'
import { Strategy } from 'passport-local'
import { UserEntity } from './../../users/serializers/user.serializer'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) implements AbstractPassportStrategy {
    constructor(@InjectRepository(UsersRepository) private readonly usersRepository: UsersRepository) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        })
    }

    async validate(email: string, password: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({ email })
        if (!user) throw new InvalidEmailOrPasswordException()

        const isPasswordEqual = await verify(user.password, password)
        if (!isPasswordEqual) throw new InvalidEmailOrPasswordException()

        return user
    }
}
import { JwtConfigService } from '@config/jwt/config.service'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserEntity } from '../../users/serializers/user.serializer'
import { UsersRepository } from '../../users/users.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly jwtConfigService: JwtConfigService,
        private readonly usersRepository: UsersRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfigService.secret,
        })
    }

    async validate({ sessionId }: Pick<UserEntity, 'sessionId'>) {
        return this.usersRepository.findOne({ sessionId: sessionId })
    }
}

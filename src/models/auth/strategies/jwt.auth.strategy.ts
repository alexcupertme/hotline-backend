import { IJwtConfigService } from '@config/jwt/config.interface'
import { AbstractPassportStrategy } from '@core/strategies/passport/passport.abstract'
import { User } from '@models/user/entity/user.entity'
import { UserEntity } from '@models/user/serializer/user.serializer'
import { UsersRepository } from '@models/user/user.repository'
import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') implements AbstractPassportStrategy {
    constructor(
        @Inject(IJwtConfigService) private readonly jwtConfigService: IJwtConfigService,
        @InjectRepository(UsersRepository) private readonly usersRepository: UsersRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfigService.authTokenSecret,
        })
    }

    async validate({ sessionID }: Pick<UserEntity, 'sessionID'>): Promise<User | undefined> {
        return this.usersRepository.findOne({ sessionID })
    }
}

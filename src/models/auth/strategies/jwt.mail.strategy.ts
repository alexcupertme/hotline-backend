import { IJwtConfigService } from '@config/jwt/config.interface'
import { AbstractPassportStrategy } from '@core/strategies/passport/passport.abstract'
import { Mail } from '@models/mail/entity/mail.entity'
import { User } from '@models/user/entity/user.entity'
import { UsersRepository } from '@models/user/user.repository'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { MailsRepository } from './../../mail/mail.repository'

@Injectable()
export class JwtMailStrategy extends PassportStrategy(Strategy, 'jwt-mail') implements AbstractPassportStrategy {
    constructor(
        @Inject(IJwtConfigService) private readonly jwtConfigService: IJwtConfigService,
        @InjectRepository(UsersRepository) private readonly usersRepository: UsersRepository,
        @InjectRepository(MailsRepository) private readonly mailsRepository: MailsRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
            ignoreExpiration: false,
            secretOrKey: jwtConfigService.mailTokenSecret,
        })
    }

    async validate({
        mailID,
        actionName,
    }: {
        mailID: string
        actionName: string
    }): Promise<{ user: User; mail: Mail }> {
        const mail = await this.mailsRepository.findOne({
            id: mailID,
            actionName,
            isActionCompleted: false,
            isActionTerminated: false,
        })
        if (!mail) throw new UnauthorizedException('Invalid token!')

        return {
            user: mail.user,
            mail: mail,
        }
    }
}

import { IJwtConfigService } from '@config/jwt/config.interface'
import { ICacheService } from '@core/services/cache/cache.interface'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IJwtMailService } from './jwt.mail.interface'

@Injectable()
export class JwtMailService implements IJwtMailService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(ICacheService) private readonly cacheService: ICacheService,
        @Inject(IJwtConfigService) private readonly jwtConfig: IJwtConfigService
    ) {}

    private cacheToken(mailID: string, token: string): void {
        this.cacheService.add(this.jwtConfig.mailTokenPrefix, mailID, token, this.jwtConfig.mailTokenTTL)
    }

    async issueToken(mailID: string, actionName: string): Promise<string> {
        const token = await this.jwtService.signAsync(
            { mailID, actionName },
            {
                expiresIn: `${this.jwtConfig.mailTokenTTL}s`,
            }
        )
        this.cacheToken(mailID, token)
        return token
    }

    async destroyToken(mailID: string): Promise<void> {
        this.cacheService.delete(this.jwtConfig.mailTokenPrefix, mailID)
    }
}

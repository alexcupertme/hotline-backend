import { IJwtConfigService } from '@config/jwt/config.interface'
import { ICacheService } from '@core/services/cache/cache.interface'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IJwtAuthService } from './jwt.auth.interface'

@Injectable()
export class JwtAuthService implements IJwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(ICacheService) private readonly cacheService: ICacheService,
        @Inject(IJwtConfigService) private readonly jwtConfig: IJwtConfigService
    ) {}

    private cacheToken(sessionID: string, token: string): void {
        this.cacheService.add(this.jwtConfig.authTokenPrefix, sessionID, token, this.jwtConfig.authTokenTTL)
    }

    async issueToken(sessionID: string): Promise<string> {
        const token = await this.jwtService.signAsync(
            { sessionID },
            {
                expiresIn: `${this.jwtConfig.authTokenTTL}s`,
            }
        )
        this.cacheToken(sessionID, token)
        return token
    }

    async deactivateTokenBySessionID(sessionID: string): Promise<void> {
        this.cacheService.delete(this.jwtConfig.authTokenPrefix, sessionID)
    }

    async renewToken(oldSessionID: string, newSessionID: string) {
        await this.deactivateTokenBySessionID(oldSessionID)
        return await this.issueToken(newSessionID)
    }
}

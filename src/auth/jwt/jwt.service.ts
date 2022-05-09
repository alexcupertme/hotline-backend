import { ICacheService } from '@core/services/cache/cache.interface'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IJwtConfigService } from '@config/jwt/config.interface'
import { IJwtAuthService } from './jwt.interface'

@Injectable()
export class JwtAuthService implements IJwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(ICacheService) private readonly cacheService: ICacheService,
        @Inject(IJwtConfigService) private readonly jwtConfig: IJwtConfigService
    ) {}

    private cacheToken(sessionId: string, token: string): void {
        this.cacheService.add(this.jwtConfig.tokenPrefix, sessionId, token, this.jwtConfig.ttl)
    }

    async issueToken(sessionId: string): Promise<string> {
        const token = await this.jwtService.signAsync(
            { sessionId },
            {
                expiresIn: `${this.jwtConfig.ttl}s`,
            }
        )
        this.cacheToken(sessionId, token)
        return token
    }

    deactivateToken(sessionId: string): void {
        this.cacheService.delete(this.jwtConfig.tokenPrefix, sessionId)
    }

    async renewToken(oldSessionId: string, newSessionId: string) {
        this.deactivateToken(oldSessionId)
        return await this.issueToken(newSessionId)
    }
}

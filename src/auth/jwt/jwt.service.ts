import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CacheService } from '@core/services/cache/cache.service'
import { JwtConfigService } from '@config/jwt/config.service'

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly cacheService: CacheService,
        private readonly jwtConfig: JwtConfigService
    ) {}

    private async cacheToken(sessionId: string, token: string) {
        await this.cacheService.add(this.jwtConfig.tokenPrefix, sessionId, token, this.jwtConfig.ttl)
    }

    async issueToken(sessionId: string) {
        const token = await this.jwtService.signAsync(
            { sessionId },
            {
                expiresIn: '15d',
            }
        )
        await this.cacheToken(sessionId, token)
        return token
    }

    // async verifyToken(accessToken: string) {
    //     const user = await this.jwtService.verifyAsync<UserEntity>(accessToken)
    //     const isTokenAlive = await this.cacheService.get(this.jwtConfig.tokenPrefix, user.sessionId)
    // }

    async deactivateToken(sessionId: string) {
        return this.cacheService.delete(this.jwtConfig.tokenPrefix, sessionId)
    }
    async renewToken(oldSessionId: string, newSessionId: string) {
        await this.deactivateToken(oldSessionId)
        return await this.issueToken(newSessionId)
    }
}

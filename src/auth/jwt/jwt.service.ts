import { JwtConfigService } from '@config/jwt/config.service'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../../models/users/serializers/user.serializer'

@Injectable()
export class JwtAuthService {
    private readonly redisPrefix: string

    constructor(
        private readonly jwtService: JwtService,
        @InjectRedis() private readonly redis: Redis,
        private readonly jwtConfig: JwtConfigService
    ) {
        this.redisPrefix = jwtConfig.redisPrefix
    }

    async issueToken(sessionId: string) {
        const data = { sessionId }
        const token = await this.jwtService.signAsync(data, {
            expiresIn: '15d',
        })
        this.redis.set(`${this.redisPrefix}${sessionId}`, token, 'EX', 60 * 60 * 24 * 15)
        return token
    }

    async verifyToken(accessToken: string) {
        const user = await this.jwtService.verifyAsync<UserEntity>(accessToken)
        const isTokenAlive = await this.redis.get(`${this.redisPrefix}${user.id}`)
        if (isTokenAlive && user) {
            return user
        } else {
            throw new UnauthorizedException('Token is expired !')
        }
    }

    async deactivateToken(sessionId: string) {
        await this.redis.del(`${this.redisPrefix}${sessionId}`)
    }

    async renewToken(oldSessionId: string, newSessionId: string) {
        await this.deactivateToken(oldSessionId)
        return await this.issueToken(newSessionId)
    }
}

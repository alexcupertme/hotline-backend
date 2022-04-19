import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CacheService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async add(redisPrefix: string, key: string, data: string, ttl?: number) {
        if (ttl) {
            return this.redis.set(`${redisPrefix}-${key}`, data, 'EX', ttl)
        } else {
            return this.redis.set(`${redisPrefix}-${key}`, data)
        }
    }

    async delete(redisPrefix: string, key: string) {
        return this.redis.del(`${redisPrefix}-${key}`)
    }

    async get(redisPrefix: string, key: string) {
        return this.redis.get(`${redisPrefix}-${key}`)
    }
}

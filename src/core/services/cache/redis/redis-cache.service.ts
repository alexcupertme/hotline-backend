import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import { Injectable } from '@nestjs/common'
import { ICacheService } from '../cache.interface'

@Injectable()
export class RedisCacheService implements ICacheService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async add(category: string, key: string, data: string, ttl?: number) {
        if (ttl) {
            return this.redis.set(`${category}-${key}`, data, 'EX', ttl)
        } else {
            return this.redis.set(`${category}-${key}`, data)
        }
    }

    async delete(category: string, key: string) {
        return this.redis.del(`${category}-${key}`)
    }

    async get(category: string, key: string) {
        return this.redis.get(`${category}-${key}`)
    }
}

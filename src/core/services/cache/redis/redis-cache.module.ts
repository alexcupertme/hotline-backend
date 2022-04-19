import { RedisCacheService } from '@core/services/cache/redis/redis-cache.service'
import { Module } from '@nestjs/common'
import { ICacheService } from '../cache.interface'
@Module({
    exports: [{ provide: ICacheService, useClass: RedisCacheService }],
    providers: [{ provide: ICacheService, useClass: RedisCacheService }],
})
export class RedisCacheModule {}

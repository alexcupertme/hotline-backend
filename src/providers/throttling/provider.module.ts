import { IRedisConfigService } from '@config/cache/redis/config.interface'
import { RedisConfigModule } from '@config/cache/redis/config.module'
import { IThrottlingConfigService } from '@config/throttling/config.interface'
import { ThrottlingConfigModule } from '@config/throttling/config.module'
import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'

@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ThrottlingConfigModule, RedisConfigModule],
            inject: [IRedisConfigService, IThrottlingConfigService],
            useFactory: async function (
                redisConfigService: IRedisConfigService,
                throttlingConfigService: IThrottlingConfigService
            ) {
                return {
                    ttl: throttlingConfigService.defaultTTL,
                    limit: throttlingConfigService.defaultLimit,
                    storage: new ThrottlerStorageRedisService({
                        host: redisConfigService.host,
                        port: redisConfigService.port,
                        password: redisConfigService.password,
                        keyPrefix: throttlingConfigService.throttlingPrefix,
                    }),
                }
            },
        }),
    ],
})
export class ThrottlingProviderModule {}

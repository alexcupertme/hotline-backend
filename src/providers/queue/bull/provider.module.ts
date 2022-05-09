import { IRedisConfigService } from '@config/cache/redis/config.interface'
import { RedisConfigModule } from '@config/cache/redis/config.module'
import { IBullConfigService } from '@config/queue/bull/config.interface'
import { BullConfigModule } from '@config/queue/bull/config.module'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [BullConfigModule, RedisConfigModule],
            useFactory: async function (
                redisConfigService: IRedisConfigService,
                bullConfigService: IBullConfigService
            ) {
                return {
                    redis: {
                        host: redisConfigService.host,
                        port: redisConfigService.port,
                        password: redisConfigService.password,
                        prefix: bullConfigService.queuePrefix,
                    },
                }
            },
            inject: [IRedisConfigService, IBullConfigService],
        }),
    ],
})
export class BullQueueProviderModule {}

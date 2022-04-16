import {Module} from "@nestjs/common";
import {RedisConfigService} from "@config/cache/redis/config.service";
import {RedisModule} from '@nestjs-modules/ioredis';
import {RedisConfigModule} from "@config/cache/redis/config.module";

@Module ( {
    imports: [
        RedisModule.forRootAsync ( {
            imports: [RedisConfigModule],
            useFactory: async ( redisConfigService: RedisConfigService ) => ( {
                config: {
                    host: redisConfigService.host,
                    port: redisConfigService.port,
                    password: redisConfigService.password
                },
            } ),
            inject: [RedisConfigService],
        } ),
    ],
} )
export class RedisDatabaseProviderModule {
}

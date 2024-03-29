import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { IRedisConfigService } from './config.interface'
import { RedisConfigService } from './config.service'
import configuration from './configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                REDIS_PORT: Joi.number().required(),
                REDIS_PWD: Joi.string().required(),
                REDIS_HOST: Joi.string().required(),
            }),
        }),
    ],
    providers: [
        {
            provide: IRedisConfigService,
            useClass: RedisConfigService,
        },
    ],
    exports: [
        {
            provide: IRedisConfigService,
            useClass: RedisConfigService,
        },
    ],
})
export class RedisConfigModule {}

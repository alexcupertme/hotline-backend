import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { RedisConfigService } from './config.service'
import configuration from './configuration'
/**
 * Import and provide redis configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                REDIS_PORT: Joi.number(),
                REDIS_PWD: Joi.string(),
                REDIS_HOST: Joi.string(),
            }),
        }),
    ],
    providers: [ConfigService, RedisConfigService],
    exports: [ConfigService, RedisConfigService],
})
export class RedisConfigModule {}

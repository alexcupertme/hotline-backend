import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { PostgresConfigService } from './config.service'
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
                POSTGRES_DB: Joi.string(),
                POSTGRES_PORT: Joi.number(),
                POSTGRES_PWD: Joi.string(),
                POSTGRES_USR: Joi.string(),
                POSTGRES_HOST: Joi.string(),
            }),
        }),
    ],
    providers: [ConfigService, PostgresConfigService],
    exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}

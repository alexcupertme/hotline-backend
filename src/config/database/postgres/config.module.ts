import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { IPostgresConfigService } from './config.interface'
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
                POSTGRES_DB: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_PWD: Joi.string().required(),
                POSTGRES_USR: Joi.string().required(),
                POSTGRES_HOST: Joi.string().required(),
            }),
        }),
    ],
    providers: [
        {
            provide: IPostgresConfigService,
            useClass: PostgresConfigService,
        },
    ],
    exports: [
        {
            provide: IPostgresConfigService,
            useClass: PostgresConfigService,
        },
    ],
})
export class PostgresConfigModule {}

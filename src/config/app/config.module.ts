import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { IAppConfigService } from './config.interface'
import { AppConfigService } from './config.service'
import configuration from './configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_NAME: Joi.string().required(),
                BACKEND_PORT: Joi.number().required(),
            }),
        }),
    ],
    providers: [
        {
            provide: IAppConfigService,
            useClass: AppConfigService,
        },
    ],
    exports: [
        {
            provide: IAppConfigService,
            useClass: AppConfigService,
        },
    ],
})
export class AppConfigModule {}

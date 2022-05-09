import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { ISendpulseConfigService } from './config.interface'
import { SendpulseConfigService } from './config.service'
import configuration from './configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                SENDPULSE_APP_USER_ID: Joi.string().required(),
                SENDPULSE_API_SECRET: Joi.string().required(),
            }),
        }),
    ],
    providers: [
        {
            provide: ISendpulseConfigService,
            useClass: SendpulseConfigService,
        },
    ],
    exports: [
        {
            provide: ISendpulseConfigService,
            useClass: SendpulseConfigService,
        },
    ],
})
export class SendpulseConfigModule {}

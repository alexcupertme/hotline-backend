import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { IMailCommonConfigService } from './config.interface'
import { MailCommonConfigService } from './config.service'
import configuration from './configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                MAIL_APP_NAME: Joi.string().required(),
                MAIL_SENDER_ADDRESS: Joi.string().required(),
                MAIL_SITE_URL: Joi.string().required(),

                MAIL_MAIL_VERIFICATION_CALLBACK_URL: Joi.string().required(),
                MAIL_RESET_PASSWORD_CALLBACK_URL: Joi.string().required(),

                MAIL_SMTP_HOST: Joi.string().required(),
                MAIL_SMTP_USER: Joi.string().required(),
                MAIL_SMTP_PASSWORD: Joi.string().required(),
                MAIL_SMTP_PORT: Joi.number().required(),
            }),
        }),
    ],
    providers: [
        {
            provide: IMailCommonConfigService,
            useClass: MailCommonConfigService,
        },
    ],
    exports: [
        {
            provide: IMailCommonConfigService,
            useClass: MailCommonConfigService,
        },
    ],
})
export class MailCommonConfigModule {}

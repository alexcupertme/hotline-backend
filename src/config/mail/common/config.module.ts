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
                MAIL_SUPPORT_URL: Joi.string().required(),
                MAIL_SUPPORT_EMAIL: Joi.string().required(),
                MAIL_PRIVACY_POLICY_URL: Joi.string().required(),
                MAIL_TERMS_OF_USE_URL: Joi.string().required(),
                MAIL_MAIL_VERIFICATION_CALLBACK_URL: Joi.string().required(),
                MAIL_RESET_PASSWORD_CALLBACK_URL: Joi.string().required(),
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

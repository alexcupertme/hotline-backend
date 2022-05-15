import { MailCommonConfigModule } from '@config/mail/common/config.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Module } from '@nestjs/common'
import { join } from 'path'
import { IMailCommonConfigService } from './../../config/mail/common/config.interface'

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [MailCommonConfigModule],
            inject: [IMailCommonConfigService],
            useFactory: async function (mailCommonConfigService: IMailCommonConfigService) {
                return {
                    transport: {
                        host: mailCommonConfigService.smtpHost,
                        port: mailCommonConfigService.smtpPort,
                        secure: false,
                        pool: true,
                        ignoreTLS: true,
                        auth: {
                            user: mailCommonConfigService.smtpUser,
                            pass: mailCommonConfigService.smtpPassword,
                        },
                    },
                    preview: true,
                    defaults: {
                        from: `"No Reply" <${mailCommonConfigService.senderAddress}>`,
                    },
                    template: {
                        dir: join(__dirname, './../../mail/templates'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }
            },
        }),
    ],
})
export class MailProviderModule {}

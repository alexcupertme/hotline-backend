import { JwtMailModule } from '@auth/jwt/mail/jwt.mail.module'
import { MailCommonConfigModule } from '@config/mail/common/config.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailJobModule } from './../../job/mail/task.module'
import { MailsRepository } from './../../models/mail/mail.repository'
import { IMailVerificationMailingService } from './mail-verification.interface'
import { MailVerificationMailingService } from './mail-verification.service'

@Module({
    imports: [TypeOrmModule.forFeature([MailsRepository]), MailCommonConfigModule, MailJobModule, JwtMailModule],
    providers: [
        {
            provide: IMailVerificationMailingService,
            useClass: MailVerificationMailingService,
        },
    ],
    exports: [
        {
            provide: IMailVerificationMailingService,
            useClass: MailVerificationMailingService,
        },
    ],
})
export class MailVerificationModule {}

import { MailCommonConfigModule } from '@config/mail/common/config.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtMailModule } from './../../auth/jwt/mail/jwt.mail.module'
import { MailJobModule } from './../../job/mail/task.module'
import { MailsRepository } from './../../models/mail/mail.repository'
import { IMailVerificationService } from './mail-verification.interface'
import { MailVerificationService } from './mail-verification.service'

@Module({
    imports: [TypeOrmModule.forFeature([MailsRepository]), MailCommonConfigModule, MailJobModule, JwtMailModule],
    providers: [
        {
            provide: IMailVerificationService,
            useClass: MailVerificationService,
        },
    ],
    exports: [
        {
            provide: IMailVerificationService,
            useClass: MailVerificationService,
        },
    ],
})
export class MailVerificationModule {}

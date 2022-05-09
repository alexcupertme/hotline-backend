import { MailCommonConfigModule } from '@config/mail/common/config.module'
import { Module } from '@nestjs/common'
import { MailJobModule } from './../../job/mail/task.module'
import { IMailVerificationService } from './mail-verification.interface'
import { MailVerificationService } from './mail-verification.service'

@Module({
    imports: [MailCommonConfigModule, MailJobModule],
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

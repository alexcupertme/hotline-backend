import { MailCommonConfigModule } from '@config/mail/common/config.module'
import { Module } from '@nestjs/common'
import { MailJobModule } from './../../job/mail/task.module'
import { IResetPasswordMailingService } from './reset-password.interface'
import { ResetPasswordMailingService } from './reset-password.service'

@Module({
    imports: [MailCommonConfigModule, MailJobModule],
    providers: [
        {
            provide: IResetPasswordMailingService,
            useClass: ResetPasswordMailingService,
        },
    ],
    exports: [
        {
            provide: IResetPasswordMailingService,
            useClass: ResetPasswordMailingService,
        },
    ],
})
export class ResetPasswordMailingModule {}

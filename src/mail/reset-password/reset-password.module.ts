import { JwtMailModule } from '@auth/jwt/mail/jwt.mail.module'
import { MailCommonConfigModule } from '@config/mail/common/config.module'
import { MailsRepository } from '@models/mail/mail.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailJobModule } from './../../job/mail/task.module'
import { IResetPasswordMailingService } from './reset-password.interface'
import { ResetPasswordMailingService } from './reset-password.service'

@Module({
    imports: [TypeOrmModule.forFeature([MailsRepository]), MailCommonConfigModule, MailJobModule, JwtMailModule],
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

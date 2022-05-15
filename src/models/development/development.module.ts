import { MailsRepository } from '@models/mail/mail.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from '../user/user.repository'
import { DevelopmentController } from './development.controller'
import { DevelopmentService } from './development.service'

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository]), TypeOrmModule.forFeature([MailsRepository])],
    controllers: [DevelopmentController],
    providers: [DevelopmentService],
})
export class DevelopmentModule {}
// TODO: Disable this in prod

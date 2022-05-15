import { MailsRepository } from '@models/mail/mail.repository'
import { UsersRepository } from '@models/user/user.repository'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeactivateUserEmailByEmailRequestDto } from './dto/deactivate-user-email-by-email.dto'
import { DeleteUserWithMailsByEmailRequestDto } from './dto/delete-user-with-mails-by-email.dto'

@Injectable()
export class DevelopmentService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        @InjectRepository(MailsRepository)
        private readonly mailsRepository: MailsRepository
    ) {}

    async deleteUserWithMailsByEmail(dto: DeleteUserWithMailsByEmailRequestDto) {
        await this.mailsRepository.delete({ email: dto.email })
        await this.usersRepository.delete({ email: dto.email })
        return { success: true }
    }

    async deactivateUserEmailByEmail(dto: DeactivateUserEmailByEmailRequestDto) {
        await this.usersRepository.update({ email: dto.email }, { isMailVerified: false })
        return { success: true }
    }
}

import { Body, Controller, Post } from '@nestjs/common'
import { DevelopmentService } from './development.service'
import { DeleteUserWithMailsByEmailRequestDto } from './dto/delete-user-with-mails-by-email.dto'

@Controller({
    version: '0',
    path: 'dev',
})
export class DevelopmentController {
    constructor(private readonly developmentService: DevelopmentService) {}

    @Post('/delete-user-with-mails-by-email')
    async requestVerifyMail(@Body() dto: DeleteUserWithMailsByEmailRequestDto): Promise<{ success: boolean }> {
        return await this.developmentService.deleteUserWithMailsByEmail(dto)
    }
}

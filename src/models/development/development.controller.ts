import { Body, Controller, Post } from '@nestjs/common'
import { DevelopmentService } from './development.service'
import { DeactivateUserEmailByEmailRequestDto } from './dto/deactivate-user-email-by-email.dto'
import { DeleteUserWithMailsByEmailRequestDto } from './dto/delete-user-with-mails-by-email.dto'

@Controller({
    version: '0',
    path: 'dev',
})
export class DevelopmentController {
    constructor(private readonly developmentService: DevelopmentService) {}

    @Post('/delete-user-with-mails-by-email')
    async deleteUserWithMailsByEmailRequestDto(
        @Body() dto: DeleteUserWithMailsByEmailRequestDto
    ): Promise<{ success: boolean }> {
        return await this.developmentService.deleteUserWithMailsByEmail(dto)
    }

    @Post('/deactivate-user-email-by-email')
    async deactivateUserEmailByEmailRequestDto(
        @Body() dto: DeactivateUserEmailByEmailRequestDto
    ): Promise<{ success: boolean }> {
        return await this.developmentService.deactivateUserEmailByEmail(dto)
    }
}

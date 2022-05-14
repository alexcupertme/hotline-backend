import { JwtAuth, JwtMail, LocalAuth } from '@core/decorators/auth.decorator'
import { Mail } from '@core/decorators/mail.mail.decorator'
import { MailUser } from '@core/decorators/mail.user.decorator'
import { User } from '@core/decorators/user.decorator'
import { defaultUserGroupsForSerializing } from '@core/serializers/model.serializer'
import { MailEntity } from '@models/mail/serializers/mail.serializer'
import { Body, Controller, Get, Ip, Post, SerializeOptions } from '@nestjs/common'
import { UserEntity } from '../user/serializer/user.serializer'
import { AuthService } from './auth.service'
import { LoginDocs } from './decorators/login.docs.decorator'
import { LogoutDocs } from './decorators/logout.docs.decorator'
import { RegistrationDocs } from './decorators/registration.docs.decorator'
import { LoginUserRequestDto } from './dto/login.auth.dto'
import { RegisterRequestDto } from './dto/register.auth.dto'
import { RequestResetPasswordResponseDto } from './dto/request-reset-password.dto'
import { ResetPasswordRequestDto, ResetPasswordResponseDto } from './dto/reset-password.auth.dto'
import { VerifyMailResponseDto } from './dto/verify-mail.auth.dto'

@SerializeOptions({ groups: defaultUserGroupsForSerializing })
@Controller({
    version: '1',
    path: 'auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @RegistrationDocs()
    async registration(@Body() inputs: RegisterRequestDto): Promise<UserEntity> {
        return await this.authService.register(inputs)
    }

    @LocalAuth(LoginUserRequestDto)
    @Post('/login')
    @LoginDocs()
    async login(@User() user: UserEntity): Promise<{ token: string }> {
        return await this.authService.login(user)
    }

    @JwtAuth()
    @Post('/logout')
    @LogoutDocs()
    async logout(@User() user: UserEntity): Promise<void> {
        return await this.authService.logout(user)
    }

    @JwtMail()
    @Get('/verify-mail')
    async verifyMail(@MailUser() user: UserEntity, @Mail() mail: MailEntity): Promise<VerifyMailResponseDto> {
        return await this.authService.verifyMail(user, mail)
    }

    @JwtAuth()
    @Get('/request-reset-password')
    async requestResetPassword(@Ip() ip: string, @User() user: UserEntity): Promise<RequestResetPasswordResponseDto> {
        return await this.authService.requestResetPassword(user, ip)
    }

    @JwtMail()
    @Post('/reset-password')
    async resetPassword(
        @Body() dto: ResetPasswordRequestDto,
        @MailUser() user: UserEntity,
        @Mail() mail: MailEntity
    ): Promise<ResetPasswordResponseDto> {
        return await this.authService.resetPassword(dto, user, mail)
    }
}

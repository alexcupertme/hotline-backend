import { JwtAuth, LocalAuth } from '@core/decorators/auth.decorator'
import { Serialize } from '@core/decorators/intercept.decorator'
import { User } from '@core/decorators/user.decorator'
import { Body, Controller, Post } from '@nestjs/common'
import { extendedUserGroupsForSerializing, UserEntity } from '../users/serializers/user.serializer'
import { AuthService } from './auth.service'
import { LoginDocs } from './decorators/login.docs.decorator'
import { LogoutDocs } from './decorators/logout.docs.decorator'
import { RegistrationDocs } from './decorators/registration.docs.decorator'
import { CreateUserRequestDto } from './dto/create.user.dto'
import { LoginUserRequestDto } from './dto/login.user.dto'

@Controller({
    version: '1',
    path: 'auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Serialize({ groups: extendedUserGroupsForSerializing })
    @Post('/register')
    @RegistrationDocs()
    async registration(@Body() inputs: CreateUserRequestDto): Promise<UserEntity> {
        return await this.authService.register(inputs)
    }

    @Serialize({ groups: extendedUserGroupsForSerializing })
    @LocalAuth(LoginUserRequestDto)
    @Post('/login')
    @LoginDocs()
    async login(@User() user: UserEntity): Promise<{ token: string }> {
        return await this.authService.login(user)
    }

    @Serialize({ groups: extendedUserGroupsForSerializing })
    @JwtAuth()
    @Post('/logout')
    @LogoutDocs()
    async logout(@User() user: UserEntity): Promise<void> {
        await this.authService.logout(user)
    }
}

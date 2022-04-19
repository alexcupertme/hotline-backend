import { User } from '@core/decorators/user.decorator'
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    SerializeOptions,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { CreateUserDto } from '../users/dto/create.user.dto'
import { extendedUserGroupsForSerializing, UserEntity } from '../users/serializers/user.serializer'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt.guard'
import { LocalAuthGuard } from './guards/local.guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SerializeOptions({ groups: extendedUserGroupsForSerializing })
    @Post('/register')
    @UseInterceptors(ClassSerializerInterceptor)
    async registration(@Body() inputs: CreateUserDto): Promise<UserEntity> {
        return await this.authService.register(inputs)
    }

    @SerializeOptions({ groups: extendedUserGroupsForSerializing })
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@User() user: UserEntity): Promise<{ token: string }> {
        return await this.authService.login(user)
    }

    @SerializeOptions({ groups: extendedUserGroupsForSerializing })
    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    @UseInterceptors(ClassSerializerInterceptor)
    async logout(@User() user: UserEntity): Promise<void> {
        await this.authService.logout(user)
    }
}

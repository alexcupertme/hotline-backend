import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    SerializeOptions,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {extendedUserGroupsForSerializing, UserEntity} from "../users/serializers/user.serializer";
import {CreateUserDto} from "../users/dto/create.user.dto";
import {AuthService} from "./auth.service";
import {LoginUserDto} from "../users/dto/login.user.dto";
import {AuthGuard} from "@nestjs/passport";
import {User} from "@core/decorators/user.decorator";

@Controller ( 'auth' )
export class AuthController {
    constructor ( private readonly authService: AuthService ) {
    }

    @SerializeOptions ( {groups: extendedUserGroupsForSerializing,} )
    @Post ( "/registration" )
    @UseInterceptors ( ClassSerializerInterceptor )
    async registration ( @Body () inputs: CreateUserDto ): Promise<UserEntity> {
        return await this.authService.register ( inputs );
    }

    @SerializeOptions ( {groups: extendedUserGroupsForSerializing,} )
    @Post ( "/login" )
    @UseInterceptors ( ClassSerializerInterceptor )
    async login ( @Body () inputs: LoginUserDto ): Promise<{token: string}> {
        return await this.authService.login ( inputs );
    }

    @SerializeOptions ( {groups: extendedUserGroupsForSerializing,} )
    @UseGuards ( AuthGuard ( 'jwt' ) )
    @Post ( "/logout" )
    @UseInterceptors ( ClassSerializerInterceptor )
    async logout ( @User () user: UserEntity ): Promise<void> {
        return await this.authService.logout ( user );
    }
}
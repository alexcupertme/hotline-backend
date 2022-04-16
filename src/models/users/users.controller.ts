import {
    Get,
    Put,
    Post,
    Body,
    Controller,
    UseInterceptors,
    SerializeOptions,
    ClassSerializerInterceptor
} from "@nestjs/common";
import {CreateUserDto} from "./dto/create.user.dto";
import {UserEntity, extendedUserGroupsForSerializing} from "./serializers/user.serializer";
import {UsersService} from "./users.service";

@Controller ( "users" )
export class UsersController {
    constructor ( private readonly usersService: UsersService ) {}

}

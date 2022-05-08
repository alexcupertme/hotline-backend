import { Controller } from '@nestjs/common'
import { UsersService } from './user.service'

@Controller({
    version: '1',
    path: 'users',
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
}

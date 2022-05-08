import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './user.controller'
import { UsersRepository } from './user.repository'
import { UsersService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import { UserEntity } from "./serializers/user.serializer";
import { CreateUserDto } from "./dto/create.user.dto";
import { EditUserDto } from "./dto/edit.user.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UsersRepository)
		private readonly usersRepository: UsersRepository
	) {}
	async create(inputs: CreateUserDto): Promise<UserEntity> {
		return await this.usersRepository.createEntity(inputs);
	}
}

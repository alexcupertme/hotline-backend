import { IsNotEmpty } from "class-validator";

export class EditUserDto {
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	name: string;
}

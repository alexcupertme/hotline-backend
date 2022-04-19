import { IsNotEmpty } from 'class-validator'

export class EditUserDto {
    @IsNotEmpty()
    name: string
}

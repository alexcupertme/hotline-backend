import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class DeleteUserWithMailsByEmailRequestDto {
    @ApiProperty({
        example: 'example@mail.ru',
        minLength: 1,
        maxLength: 30,
        required: true,
    })
    @IsEmail()
    @Length(1, 30)
    @IsNotEmpty()
    email: string
}

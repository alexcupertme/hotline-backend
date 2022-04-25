import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'

export class LoginUserRequestDto {
    @ApiProperty({
        example: 'example@mail.ru',
        minLength: 1,
        maxLength: 30,
    })
    @IsEmail()
    @Length(1, 30)
    @IsNotEmpty()
    email: string

    @ApiProperty({
        example: 'booba123-123CC',
        minLength: 8,
        maxLength: 30,
    })
    @Length(8, 30)
    @IsNotEmpty()
    @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&-_])[A-Za-z0-9@$!%*?&-_]{8,30}$") // prettier-ignore
    password: string
}

export class LoginUserResponseDto {
    @ApiProperty()
    token: string
}

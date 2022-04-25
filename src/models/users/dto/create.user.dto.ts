import { ApiProperty } from '@nestjs/swagger'
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length, Matches } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({
        example: 'viktor12',
        minLength: 1,
        maxLength: 30,
    })
    @IsAlphanumeric()
    @Length(1, 30)
    @IsNotEmpty()
    nickname: string

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

    @ApiProperty({
        example: 'Виктор',
        minLength: 2,
        maxLength: 30,
    })
    @Length(2, 30)
    @IsNotEmpty()
    firstName: string

    @ApiProperty({
        example: 'Михайлов',
        minLength: 2,
        maxLength: 30,
    })
    @Length(2, 30)
    @IsNotEmpty()
    lastName: string
}

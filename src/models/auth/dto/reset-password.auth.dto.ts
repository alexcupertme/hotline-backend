import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length, Matches } from 'class-validator'

export class ResetPasswordRequestDto {
    @ApiProperty({
        example: 'booba123-123CC',
        minLength: 8,
        maxLength: 30,
        required: true,
    })
    @Length(8, 30)
    @IsNotEmpty()
    @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&-_])[A-Za-z0-9@$!%*?&-_]{8,30}$") // prettier-ignore
    password: string
}

export class ResetPasswordResponseDto {
    success: boolean
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class VerifyMailQueryDto {
    @ApiProperty({
        example: '<long string>',
        type: 'JWT Token',
        required: true,
    })
    @IsNotEmpty()
    token: string
}

export class VerifyMailResponseDto {
    @ApiProperty()
    success: boolean
}

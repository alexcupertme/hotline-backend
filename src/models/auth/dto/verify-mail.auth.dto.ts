import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class VerifyMailQueryDto {
    @ApiProperty({
        example: '<token>',
        type: 'string',
        required: true,
    })
    @IsNotEmpty()
    token: string
}

export class VerifyMailResponseDto {
    @ApiProperty()
    success: boolean
}

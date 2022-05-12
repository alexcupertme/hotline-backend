import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { LoginUserResponseDto } from '../dto/login.auth.dto'

export function LoginDocs() {
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: 'Successfully authorized',
            type: LoginUserResponseDto,
        }),
        ApiResponse({
            status: 400,
            description: 'Some fields are missing or user doesnt exists',
        }),
        ApiResponse({
            status: 500,
            description: 'Server error',
        })
    )
}

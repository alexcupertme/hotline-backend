import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CreateUserResponseDto } from './../dto/create.user.dto'

export function RegistrationDocs() {
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: 'Successfully created',
            type: CreateUserResponseDto,
        }),
        ApiResponse({
            status: 400,
            description: 'Some fields are missing or user already exists',
        }),
        ApiResponse({
            status: 500,
            description: 'Server error',
        })
    )
}

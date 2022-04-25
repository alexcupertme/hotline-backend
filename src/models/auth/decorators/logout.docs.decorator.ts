import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

export function LogoutDocs() {
    return applyDecorators(
        ApiResponse({
            status: 201,
            description: 'Successfully logged out',
        }),
        ApiResponse({
            status: 400,
            description: 'User doesnt exists or token expired',
        }),
        ApiResponse({
            status: 500,
            description: 'Server error',
        })
    )
}

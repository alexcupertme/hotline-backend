import { JwtAuthGuard } from '@models/auth/guards/jwt.guard'
import { applyDecorators, Type, UseGuards } from '@nestjs/common'
import { ApiBody, ApiHeader } from '@nestjs/swagger'
import { LocalAuthGuard } from '@models/auth/guards/local.guard'

export function JwtAuth() {
    return applyDecorators(
        ApiHeader({
            name: 'Authorization',
            example: 'Bearer <token>',
            description: 'Auth token for authorization',
            required: true,
        }),
        UseGuards(JwtAuthGuard)
    )
}

export function LocalAuth(dto: Type<unknown>) {
    return applyDecorators(
        UseGuards(LocalAuthGuard),
        ApiBody({
            type: dto,
        })
    )
}

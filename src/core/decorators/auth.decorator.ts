import { JwtAuthGuard } from '@models/auth/guards/jwt.auth.guard'
import { LocalAuthGuard } from '@models/auth/guards/local.guard'
import { applyDecorators, Type, UseGuards } from '@nestjs/common'
import { ApiBody, ApiHeader, ApiQuery } from '@nestjs/swagger'
import { VerifyMailQueryDto } from '../../models/auth/dto/verify-mail.auth.dto'
import { JwtMailGuard } from './../../models/auth/guards/jwt.mail.guard'

export function JwtAuth() {
    return applyDecorators(
        ApiHeader({
            name: 'Authorization',
            example: 'Bearer <token>',
            description: 'JWT token for authorization',
            required: true,
        }),
        UseGuards(JwtAuthGuard)
    )
}

export function JwtMail() {
    return applyDecorators(
        ApiQuery({
            type: VerifyMailQueryDto,
            example: 'token=<token>',
            description: 'JWT token for mail verification',
            required: true,
        }),
        UseGuards(JwtMailGuard)
    )
}

export function LocalAuth(dto: Type<unknown>) {
    return applyDecorators(
        UseGuards(LocalAuthGuard),
        ApiBody({
            type: dto,
            description: 'Standart login + password auth flow',
        })
    )
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Mail = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.mail
})

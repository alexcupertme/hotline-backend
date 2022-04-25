import { applyDecorators, ClassSerializerInterceptor, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface'

export function Serialize(options: ClassTransformOptions) {
    return applyDecorators(UseInterceptors(ClassSerializerInterceptor), SerializeOptions(options))
}

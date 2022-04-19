import { JwtConfigModule } from '@config/jwt/config.module'
import { JwtConfigService } from '@config/jwt/config.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthService } from './jwt.service'

@Module({
    imports: [
        JwtConfigModule,
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useFactory: async (jwtConfigService: JwtConfigService) => ({
                secret: jwtConfigService.secret,
            }),
            inject: [JwtConfigService],
        }),
    ],
    providers: [JwtAuthService],
    exports: [JwtModule, JwtAuthService],
})
export class JwtProviderModule {}

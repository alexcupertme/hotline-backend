import { Module } from '@nestjs/common'
import { JwtConfigService } from '@config/jwt/config.service'
import { JwtConfigModule } from '@config/jwt/config.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthService } from './jwt.service'
import { CacheModule } from '@core/services/cache/cache.module'

@Module({
    imports: [
        JwtConfigModule,
        CacheModule,
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

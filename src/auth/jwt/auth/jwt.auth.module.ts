import { IJwtConfigService } from '@config/jwt/config.interface'
import { JwtConfigModule } from '@config/jwt/config.module'
import { CacheModule } from '@core/services/cache/cache.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { IJwtAuthService } from './jwt.auth.interface'
import { JwtAuthService } from './jwt.auth.service'

@Module({
    imports: [
        JwtConfigModule,
        CacheModule,
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useFactory: async (jwtConfigService: IJwtConfigService) => ({
                secret: jwtConfigService.authTokenSecret,
            }),
            inject: [IJwtConfigService],
        }),
    ],
    providers: [{ provide: IJwtAuthService, useClass: JwtAuthService }],
    exports: [{ provide: IJwtAuthService, useClass: JwtAuthService }],
})
export class JwtAuthModule {}

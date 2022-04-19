import { IJwtConfigService } from '@config/jwt/config.interface'
import { JwtConfigModule } from '@config/jwt/config.module'
import { RedisCacheModule } from '@core/services/cache/redis/redis-cache.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { IJwtAuthService } from './jwt.interface'
import { JwtAuthService } from './jwt.service'

@Module({
    imports: [
        JwtConfigModule,
        RedisCacheModule,
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useFactory: async (jwtConfigService: IJwtConfigService) => ({
                secret: jwtConfigService.secret,
            }),
            inject: [IJwtConfigService],
        }),
    ],
    providers: [{ provide: IJwtAuthService, useClass: JwtAuthService }],
    exports: [{ provide: IJwtAuthService, useClass: JwtAuthService }],
})
export class JwtProviderModule {}

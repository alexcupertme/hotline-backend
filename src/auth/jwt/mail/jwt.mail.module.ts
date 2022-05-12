import { IJwtConfigService } from '@config/jwt/config.interface'
import { JwtConfigModule } from '@config/jwt/config.module'
import { CacheModule } from '@core/services/cache/cache.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { IJwtMailService } from './jwt.mail.interface'
import { JwtMailService } from './jwt.mail.service'

@Module({
    imports: [
        JwtConfigModule,
        CacheModule,
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useFactory: async (jwtConfigService: IJwtConfigService) => ({
                secret: jwtConfigService.mailTokenSecret,
            }),
            inject: [IJwtConfigService],
        }),
    ],
    providers: [{ provide: IJwtMailService, useClass: JwtMailService }],
    exports: [{ provide: IJwtMailService, useClass: JwtMailService }],
})
export class JwtMailModule {}

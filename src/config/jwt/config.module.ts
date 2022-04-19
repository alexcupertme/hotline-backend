import { JwtConfigService } from '@config/jwt/config.service'
import configuration from '@config/jwt/configuration'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { IJwtConfigService } from './config.interface'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string(),
            }),
        }),
    ],
    providers: [{ provide: IJwtConfigService, useClass: JwtConfigService }],
    exports: [{ provide: IJwtConfigService, useClass: JwtConfigService }],
})
export class JwtConfigModule {}

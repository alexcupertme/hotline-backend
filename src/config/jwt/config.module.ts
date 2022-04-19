import { JwtConfigService } from '@config/jwt/config.service'
import configuration from '@config/jwt/configuration'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string(),
            }),
        }),
    ],
    providers: [ConfigService, JwtConfigService],
    exports: [ConfigService, JwtConfigService],
})
export class JwtConfigModule {}

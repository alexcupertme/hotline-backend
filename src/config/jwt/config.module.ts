import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { IJwtConfigService } from './config.interface'
import { JwtConfigService } from './config.service'
import configuration from './configuration'

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

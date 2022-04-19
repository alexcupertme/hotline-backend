import * as Joi from 'joi';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import configuration from "@config/jwt/configuration";
import {JwtConfigService} from "@config/jwt/config.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                JWT_SECRET: Joi.string(),
            }),
        }),
    ],
    providers: [JwtConfigService],
    exports: [JwtConfigService],
} )
export class JwtConfigModule {
}

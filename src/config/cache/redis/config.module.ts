import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { RedisConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide redis configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        REDIS_PORT: Joi.number(),
        REDIS_PWD: Joi.string(),
        REDIS_HOST: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, RedisConfigService],
  exports: [ConfigService, RedisConfigService],
})
export class RedisConfigModule {}

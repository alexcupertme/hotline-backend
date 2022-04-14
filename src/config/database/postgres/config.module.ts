import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { PostgresConfigService } from './config.service';
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
        POSTGRES_DB: Joi.string(),
        POSTGRES_PORT: Joi.number(),
        POSTGRES_PWD: Joi.string(),
        POSTGRES_USR: Joi.string(),
        POSTGRES_HOST: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}

import { DatabaseType } from "typeorm";
import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { PostgresConfigModule } from "@config/database/postgres/config.module";
import { PostgresConfigService } from "@config/database/postgres/config.service";
import { RedisConfigService } from "@config/cache/redis/config.service";
import { RedisConfigModule } from "@config/cache/redis/config.module";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [PostgresConfigModule, RedisConfigModule],
			useFactory: async (postgresConfigService: PostgresConfigService, redisConfigService: RedisConfigService) => ({
				type: "postgres" as DatabaseType,
				host: postgresConfigService.host,
				port: postgresConfigService.port,
				username: postgresConfigService.username,
				password: postgresConfigService.password,
				database: postgresConfigService.database,
				logging: true,
				synchronize: true,
				migrationsRun: false,
				cache: {
					type: "ioredis",
					duration: 60000,
					options: {
						host: redisConfigService.host,
						port: redisConfigService.port,
						password: redisConfigService.password,
					},
				},
				extra: {
					max: 10,
					connectionTimeoutMillis: 2000,
				},
				entities: [__dirname + "/../../../**/*.entity.js"],
				migrations: [__dirname + "/../../../database/migrations/**/*.js"],
			}),
			inject: [PostgresConfigService, RedisConfigService],
		} as TypeOrmModuleAsyncOptions),
	],
})
export class PostgresDatabaseProviderModule {}

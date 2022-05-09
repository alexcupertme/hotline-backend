import { IRedisConfigService } from '@config/cache/redis/config.interface'
import { RedisConfigModule } from '@config/cache/redis/config.module'
import { IPostgresConfigService } from '@config/database/postgres/config.interface'
import { PostgresConfigModule } from '@config/database/postgres/config.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { DatabaseType } from 'typeorm'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [PostgresConfigModule, RedisConfigModule],
            useFactory: async (
                postgresConfigService: IPostgresConfigService,
                redisConfigService: IRedisConfigService
            ) => ({
                type: 'postgres' as DatabaseType,
                host: postgresConfigService.host,
                port: postgresConfigService.port,
                username: postgresConfigService.username,
                password: postgresConfigService.password,
                database: postgresConfigService.database,
                logging: false,
                synchronize: true,
                migrationsRun: false,
                cache: {
                    type: postgresConfigService.cacheType,
                    duration: postgresConfigService.cacheDuration,
                    options: {
                        host: redisConfigService.host,
                        port: redisConfigService.port,
                        password: redisConfigService.password,
                    },
                },
                extra: {
                    max: postgresConfigService.maxConnections,
                    connectionTimeoutMillis: postgresConfigService.connectionTimeoutMs,
                },
                entities: [__dirname + '/../../../**/*.entity.js'],
                migrations: [__dirname + '/../../../database/migrations/**/*.js'],
            }),
            inject: [IPostgresConfigService, IRedisConfigService],
        } as TypeOrmModuleAsyncOptions),
    ],
})
export class PostgresDatabaseProviderModule {}

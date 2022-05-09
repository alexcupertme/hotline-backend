import { UsersModule } from '@models/user/user.module'
import { Module } from '@nestjs/common'
import { PostgresDatabaseProviderModule } from 'providers/database/postgres/provider.module'
import { AuthModule } from './models/auth/auth.module'
import { RedisDatabaseProviderModule } from './providers/database/redis/provider.module'
import { BullQueueProviderModule } from './providers/queue/bull/provider.module'

@Module({
    imports: [
        PostgresDatabaseProviderModule,
        RedisDatabaseProviderModule,
        BullQueueProviderModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [],
})
export class AppModule {}

import { UsersModule } from '@models/user/user.module'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'
import { PostgresDatabaseProviderModule } from 'providers/database/postgres/provider.module'
import { AuthModule } from './models/auth/auth.module'
import { RedisDatabaseProviderModule } from './providers/database/redis/provider.module'
import { MailProviderModule } from './providers/mail/provider.module'
import { BullQueueProviderModule } from './providers/queue/bull/provider.module'
import { ThrottlingProviderModule } from './providers/throttling/provider.module'

@Module({
    imports: [
        PostgresDatabaseProviderModule,
        RedisDatabaseProviderModule,
        MailProviderModule,
        ThrottlingProviderModule,
        BullQueueProviderModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}

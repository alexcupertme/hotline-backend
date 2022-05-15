import { UsersModule } from '@models/user/user.module'
import { Module } from '@nestjs/common'
import { PostgresDatabaseProviderModule } from 'providers/database/postgres/provider.module'
import { AuthModule } from './models/auth/auth.module'
import { DevelopmentModule } from './models/development/development.module'
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
        DevelopmentModule,
        AuthModule,
    ],
    controllers: [],
    // providers: [
    //     {
    //         provide: APP_GUARD,
    //         useClass: ThrottlerGuard,
    //     },
    // ],
    // TODO: Remove that in prod
})
export class AppModule {}

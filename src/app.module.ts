import {Module} from "@nestjs/common";
import {UsersModule} from "models/users/users.module";
import {PostgresDatabaseProviderModule} from "providers/database/postgres/provider.module";
import {AuthModule} from "./models/auth/auth.module";
import {RedisDatabaseProviderModule} from "./providers/database/redis/provider.module";

@Module ( {
    imports: [PostgresDatabaseProviderModule, RedisDatabaseProviderModule, UsersModule, AuthModule],
    controllers: [],
} )
export class AppModule {
}

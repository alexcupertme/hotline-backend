import { Module } from "@nestjs/common";
import { UsersModule } from "models/users/users.module";
import { PostgresDatabaseProviderModule } from "providers/database/postgres/provider.module";

@Module({
	imports: [PostgresDatabaseProviderModule, UsersModule],
})
export class AppModule {}

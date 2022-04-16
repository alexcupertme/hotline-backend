import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "../users/users.repository";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {JwtProviderModule} from "../../auth/jwt/jwt.module";
import {JwtConfigModule} from "@config/jwt/config.module";
import {JwtStrategy} from "./strategies/auth.strategies";

@Module ( {
    imports: [TypeOrmModule.forFeature ( [UsersRepository] ), JwtProviderModule, JwtConfigModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
} )

export class AuthModule {
}
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class JwtConfigService {
    constructor(private configService: ConfigService) {}

    get secret(): string {
        return String(this.configService.get<string>(`jwtSecret.secret`))
    }

    get redisPrefix(): string {
        return String(this.configService.get<string>(`jwtSecret.redisPrefix`))
    }
}

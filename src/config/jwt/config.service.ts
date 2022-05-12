import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IJwtConfigService } from './config.interface'

@Injectable()
export class JwtConfigService implements IJwtConfigService {
    constructor(private readonly configService: ConfigService) {}

    get authTokenSecret(): string {
        return String(this.configService.get<string>(`jwt.authTokenSecret`))
    }

    get authTokenPrefix(): string {
        return String(this.configService.get<string>(`jwt.authTokenPrefix`))
    }

    get authTokenTTL(): number {
        return Number(this.configService.get<number>('jwt.authTokenTTL'))
    }

    get mailTokenSecret(): string {
        return String(this.configService.get<string>(`jwt.mailTokenSecret`))
    }

    get mailTokenPrefix(): string {
        return String(this.configService.get<string>(`jwt.mailTokenPrefix`))
    }

    get mailTokenTTL(): number {
        return Number(this.configService.get<number>('jwt.mailTokenTTL'))
    }
}

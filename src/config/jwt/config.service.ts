import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IJwtConfigService } from './config.interface'

@Injectable()
export class JwtConfigService implements IJwtConfigService {
    constructor(private readonly configService: ConfigService) {}

    get secret(): string {
        return String(this.configService.get<string>(`jwt.secret`))
    }

    get tokenPrefix(): string {
        return String(this.configService.get<string>(`jwt.tokenPrefix`))
    }

    get ttl(): number {
        return Number(this.configService.get<number>('jwt.ttl'))
    }
}

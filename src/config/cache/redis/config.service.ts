import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IRedisConfigService } from './config.interface'

@Injectable()
export class RedisConfigService implements IRedisConfigService {
    constructor(private readonly configService: ConfigService) {}

    get host(): string {
        return String(this.configService.get<string>(`redis.host`))
    }

    get port(): number {
        return Number(this.configService.get<string>(`redis.port`))
    }

    get password(): string {
        return String(this.configService.get<string>(`redis.password`))
    }
}

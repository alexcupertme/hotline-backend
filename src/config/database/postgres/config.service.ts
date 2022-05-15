import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IPostgresConfigService } from './config.interface'

@Injectable()
export class PostgresConfigService implements IPostgresConfigService {
    constructor(private readonly configService: ConfigService) {}

    get host(): string {
        return String(this.configService.get<string>(`postgres.host`))
    }

    get port(): number {
        return Number(this.configService.get<string>(`postgres.port`))
    }

    get username(): string {
        return String(this.configService.get<string>(`postgres.username`))
    }

    get password(): string {
        return String(this.configService.get<string>(`postgres.password`))
    }

    get database(): string {
        return String(this.configService.get<string>(`postgres.database`))
    }

    get cacheType(): string {
        return String(this.configService.get<string>(`postgres.cacheType`))
    }

    get cacheDuration(): number {
        return Number(this.configService.get<string>(`postgres.cacheDuration`))
    }

    get maxConnections(): number {
        return Number(this.configService.get<string>(`postgres.maxConnections`))
    }

    get connectionTimeoutMs(): number {
        return Number(this.configService.get<string>(`postgres.connectionTimeoutMs`))
    }
}

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IPostgresConfigService } from './config.interface'

@Injectable()
export class PostgresConfigService implements IPostgresConfigService {
    constructor(private configService: ConfigService) {}

    get host(): string {
        return this.configService.get<string>(`postgres.host`)
    }

    get port(): number {
        return Number(this.configService.get<string>(`postgres.port`))
    }

    get username(): string {
        return this.configService.get<string>(`postgres.username`)
    }

    get password(): string {
        return this.configService.get<string>(`postgres.password`)
    }

    get database(): string {
        return this.configService.get<string>(`postgres.database`)
    }
}

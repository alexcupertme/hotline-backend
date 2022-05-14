import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IThrottlingConfigService } from './config.interface'

@Injectable()
export class ThrottlingConfigService implements IThrottlingConfigService {
    constructor(private readonly configService: ConfigService) {}

    get throttlingPrefix(): string {
        return String(this.configService.get<string>(`throttling.throttlingPrefix`))
    }

    get defaultTTL(): number {
        return Number(this.configService.get<number>(`throttling.defaultTTL`))
    }

    get defaultLimit(): number {
        return Number(this.configService.get<number>(`throttling.defaultLimit`))
    }
}

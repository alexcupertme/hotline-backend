import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IAppConfigService } from './config.interface'

@Injectable()
export class AppConfigService implements IAppConfigService {
    constructor(private configService: ConfigService) {}

    get port(): number {
        return Number(this.configService.get<string>(`app.port`))
    }

    get appName(): string {
        return String(this.configService.get<string>(`app.appName`))
    }
}

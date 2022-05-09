import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IBullConfigService } from './config.interface'

@Injectable()
export class BullConfigService implements IBullConfigService {
    constructor(private readonly configService: ConfigService) {}

    get queuePrefix(): string {
        return String(this.configService.get<string>(`bull.queuePrefix`))
    }
}

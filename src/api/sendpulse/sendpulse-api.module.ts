import { CacheModule } from '@core/services/cache/cache.module'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { SendpulseConfigModule } from './../../config/mail/sendpulse/config.module'
import { ISendpulseAPIService } from './sendpulse-api.interface'
import { SendpulseAPIService } from './sendpulse-api.service'

@Module({
    imports: [SendpulseConfigModule, HttpModule, CacheModule],
    providers: [{ provide: ISendpulseAPIService, useClass: SendpulseAPIService }],
    exports: [{ provide: ISendpulseAPIService, useClass: SendpulseAPIService }],
})
export class SendpulseAPIModule {}

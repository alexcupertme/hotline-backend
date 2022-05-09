import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { IBullConfigService } from './config.interface'
import { BullConfigService } from './config.service'
import configuration from './configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
    providers: [{ provide: IBullConfigService, useClass: BullConfigService }],
    exports: [{ provide: IBullConfigService, useClass: BullConfigService }],
})
export class BullConfigModule {}

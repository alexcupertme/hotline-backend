import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { IThrottlingConfigService } from './config.interface'
import { ThrottlingConfigService } from './config.service'
import configuration from './configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
    providers: [{ provide: IThrottlingConfigService, useClass: ThrottlingConfigService }],
    exports: [{ provide: IThrottlingConfigService, useClass: ThrottlingConfigService }],
})
export class ThrottlingConfigModule {}

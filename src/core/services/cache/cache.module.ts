import { Module } from '@nestjs/common'
import { ICacheService } from './cache.interface'
import { CacheService } from './cache.service'
@Module({
    exports: [{ provide: ICacheService, useClass: CacheService }],
    providers: [{ provide: ICacheService, useClass: CacheService }],
})
export class CacheModule {}

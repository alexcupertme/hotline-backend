import { CacheService } from '@core/services/cache/cache.service'
import { Module } from '@nestjs/common'
@Module({
    exports: [CacheService],
    providers: [CacheService],
})
export class CacheModule {}

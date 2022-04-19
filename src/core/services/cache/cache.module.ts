import {Module} from "@nestjs/common";
import {CacheService} from "@core/services/cache/cache.service";
@Module ( {
    exports: [CacheService],
    providers: [CacheService]
} )

export class CacheModule {
}
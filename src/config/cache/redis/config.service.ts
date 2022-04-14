import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with redis config based operations.
 *
 * @class
 */
@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>(`redis.host`);
  }
  get port(): number {
    return Number(this.configService.get<string>(`redis.port`));
  }
  get password(): string {
    return this.configService.get<string>(`redis.password`);
  }
}

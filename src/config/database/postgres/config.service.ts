import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with postgres config based operations.
 *
 * @class
 */
@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>(`postgres.host`);
  }
  get port(): number {
    return Number(this.configService.get<string>(`postgres.port`));
  }
  get username(): string {
    return this.configService.get<string>(`postgres.username`);
  }
  get password(): string {
    return this.configService.get<string>(`postgres.password`);
  }
  get database(): string {
    return this.configService.get<string>(`postgres.database`);
  }
}

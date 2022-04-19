import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable ()
export class JwtConfigService {
    constructor ( private readonly configService: ConfigService ) {
    }

    get secret (): string {
        return String ( this.configService.get<string> ( `jwtSecret.secret` ) );
    }

    get tokenPrefix (): string {
        return String ( this.configService.get<string> ( `jwtSecret.tokenPrefix` ) );
    }

    get ttl (): number {
        return this.configService.get<number> ( 'jwtSecret.ttl' )
    }
}

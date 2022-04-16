import {UnauthorizedException} from "@nestjs/common";

export class InvalidEmailOrPasswordException extends UnauthorizedException {
    constructor () {
        super ( 'Uncorrected email or password' );
    }
}
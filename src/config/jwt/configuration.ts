import {registerAs} from '@nestjs/config';

export default registerAs ( 'jwtSecret', () => ( {
    secret: process.env["JWT_SECRET "],
    tokenPrefix: "jwttoken",
    ttl: 60 * 60 * 24 * 15
} ) );

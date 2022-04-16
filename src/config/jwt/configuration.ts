import {registerAs} from '@nestjs/config';

export default registerAs ( 'jwtSecret', () => ( {
    secret: process.env["JWT_SECRET "],
    redisPrefix: "jwttoken-"
} ) );

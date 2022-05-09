import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET,
    tokenPrefix: 'jwt-token',
    ttl: 60 * 60 * 24 * 15,
}))

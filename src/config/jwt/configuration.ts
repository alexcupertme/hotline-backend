import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
    authTokenSecret: process.env.AUTH_JWT_SECRET,
    authTokenPrefix: 'jwt-token-auth',
    authTokenTTL: 60 * 60 * 24 * 15, // 15 days

    mailTokenSecret: process.env.MAIL_JWT_SECRET,
    mailTokenPrefix: 'jwt-token-mail',
    mailTokenTTL: 60 * 60 * 6, // 6 hours
}))

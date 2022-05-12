import { registerAs } from '@nestjs/config'

export default registerAs('sendpulse', () => ({
    appUserID: process.env.SENDPULSE_APP_USER_ID,
    apiSecret: process.env.SENDPULSE_API_SECRET,
    baseUrl: 'https://api.sendpulse.com',

    oauthGateway: '/oauth/access_token',
    oauthGrantType: 'client_credentials',

    smtpSendEmailGateway: '/smtp/emails',

    tokenPrefix: 'sendpulse-token',
}))

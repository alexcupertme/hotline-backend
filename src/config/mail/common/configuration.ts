import { registerAs } from '@nestjs/config'

export default registerAs('mail-common', () => ({
    appName: process.env.MAIL_APP_NAME,
    senderAddress: process.env.MAIL_SENDER_ADDRESS,
    siteUrl: process.env.MAIL_SITE_URL,

    smtpHost: process.env.MAIL_SMTP_HOST,
    smtpUser: process.env.MAIL_SMTP_USER,
    smtpPassword: process.env.MAIL_SMTP_PASSWORD,
    smtpPort: process.env.MAIL_SMTP_PORT,

    mailVerificationCallbackUrl: process.env.MAIL_MAIL_VERIFICATION_CALLBACK_URL,
    mailVerificationActionName: 'mail-verification',

    resetPasswordCallbackUrl: process.env.MAIL_RESET_PASSWORD_CALLBACK_URL,
    resetPasswordActionName: 'reset-password',
}))

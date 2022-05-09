import { registerAs } from '@nestjs/config'

export default registerAs('mail-common', () => ({
    appName: process.env.MAIL_APP_NAME,
    senderAddress: process.env.MAIL_SENDER_ADDRESS,
    supportUrl: process.env.MAIL_SUPPORT_URL,
    supportEmail: process.env.MAIL_SUPPORT_EMAIL,
    privacyPolicyUrl: process.env.MAIL_PRIVACY_POLICY_URL,
    termsOfUseUrl: process.env.MAIL_TERMS_OF_USE_URL,
    callbackUrl: process.env.MAIL_CALLBACK_URL,
}))

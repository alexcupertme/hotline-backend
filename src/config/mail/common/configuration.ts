import { registerAs } from '@nestjs/config'

export default registerAs('mail-common', () => ({
    appName: process.env.MAIL_APP_NAME,
    senderAddress: process.env.MAIL_SENDER_ADDRESS,
    supportUrl: process.env.MAIL_SUPPORT_URL,
    supportEmail: process.env.MAIL_SUPPORT_EMAIL,
    privacyPolicyUrl: process.env.MAIL_PRIVACY_POLICY_URL,
    termsOfUseUrl: process.env.MAIL_TERMS_OF_USE_URL,

    mailVerificationCallbackUrl: process.env.MAIL_MAIL_VERIFICATION_CALLBACK_URL,
    mailVerificationActionName: 'mail_verification',

    resetPasswordCallbackUrl: process.env.MAIL_RESET_PASSWORD_CALLBACK_URL,
    resetPasswordActionName: 'reset_password',
}))

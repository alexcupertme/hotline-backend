import { registerAs } from '@nestjs/config'

export default registerAs('throttling', () => ({
    defaultTTL: 60,
    defaultLimit: 6,
    throttlingPrefix: 'throttling',
}))

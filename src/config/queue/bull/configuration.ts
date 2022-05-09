import { registerAs } from '@nestjs/config'

export default registerAs('bull', () => ({
    queuePrefix: 'bull-queue',
}))

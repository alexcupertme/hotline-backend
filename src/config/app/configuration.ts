import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
    port: process.env.BACKEND_PORT,
    appName: process.env.APP_NAME,
}))

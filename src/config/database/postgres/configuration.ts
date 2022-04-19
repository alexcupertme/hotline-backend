import { registerAs } from '@nestjs/config'

export default registerAs('postgres', () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USR,
    password: process.env.POSTGRES_PWD,
    database: process.env.POSTGRES_DB,
}))

import {z} from 'zod'
import dotenv from 'dotenv'

const envSchema = z.object({
    PORT : z.string().min(2).default("5000"),
    DB_URL : z.string().min(1),
    SESSION_SECRET : z.string().min(5),
    NODE_ENV : z.enum(['DEVELOPMENT','PRODUCTION','TESTING']).default('DEVELOPMENT')
})

dotenv.config()

const env = envSchema.parse(process.env);

export default env;
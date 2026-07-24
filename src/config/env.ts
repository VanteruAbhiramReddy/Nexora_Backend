import {z} from 'zod'
import dotenv from 'dotenv'

const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(5000),
    SESSION_SECRET : z.string().min(5),
    NODE_ENV : z.enum(['development','production','testing']).default('development'),
    DB_URL : z.url(),
    FRONTEND_URL : z.url().optional() // Currently optional because I'm testing the backend with postman.
})

dotenv.config()

const env = envSchema.parse(process.env);

export default env;
import { SafeUser } from "../../modules/auth/auth.types.ts"

declare global{
    namespace Express{
        interface Request{
            userId ?: number,
            validated ?: unknown,
            userData ?:SafeUser
        }
    }
}

export {}
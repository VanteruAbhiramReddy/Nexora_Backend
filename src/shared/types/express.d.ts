declare global{
    namespace Express{
        interface Request{
            userId ?: number,
            validated ?: unknown
        }
    }
}

export {}
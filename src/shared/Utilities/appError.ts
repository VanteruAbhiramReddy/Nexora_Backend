class AppError extends Error {
    success:boolean;
    status: 'fail' | 'error'
    constructor(message: string, public statusCode: number) {
        super(message)

        this.success = false

        this.status = String(statusCode).startsWith("4")
            ? "fail"
            : "error"

        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError;
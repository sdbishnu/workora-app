export class WorkoraError extends Error {
    code;
    category;
    metadata;
    constructor(code, message, options = {}) {
        super(message, { cause: options.cause });
        this.name = "WorkoraError";
        this.code = code;
        this.category = options.category ?? "system";
        this.metadata = Object.freeze({ ...(options.metadata ?? {}) });
    }
}

export function serializeWorkoraError(error) {
    return Object.freeze({
        name: error.name,
        code: error.code,
        category: error.category,
        message: error.message,
        metadata: error.metadata
    });
}

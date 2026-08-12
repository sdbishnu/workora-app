export function validate(schema, input) {
    return schema.parse(input);
}
export function safeValidate(schema, input) {
    const result = schema.safeParse(input);
    if (result.success) {
        return Object.freeze({ success: true, data: result.data });
    }
    const issues = [];
    for (const issue of result.error.issues) {
        issues.push(Object.freeze({
            path: Object.freeze(Array.from(issue.path)),
            message: issue.message
        }));
    }
    const error = Object.freeze({
        issues: Object.freeze(issues)
    });
    return Object.freeze({ success: false, error });
}

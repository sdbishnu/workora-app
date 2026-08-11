import { ZodError } from "zod";
import { environmentSchema } from "./schema.js";
import { normalizeEnvironment } from "./normalize.js";
export function loadEnvironment(source = process.env) {
    try {
        const validatedEnvironment = environmentSchema.parse(source);
        return normalizeEnvironment(validatedEnvironment);
    }
    catch (error) {
        if (error instanceof ZodError) {
            throw new Error("Invalid Workora environment configuration.", { cause: error });
        }
        throw error;
    }
}

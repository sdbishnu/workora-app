import { z } from "zod";
const environmentBoolean = z.preprocess((value) => {
    if (value === "true")
        return true;
    if (value === "false")
        return false;
    return value;
}, z.boolean());
export const environmentSchema = z.object({
    HOST_NAME: z.string().trim().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
    PORT: z.coerce.number().int().positive(),
    TENANT_IS_ENABLED: environmentBoolean,
    DATABASE_HOST: z.string().trim().min(1),
    DATABASE_PORT: z.coerce.number().int().positive(),
    DATABASE_NAME: z.string().trim().min(1),
    DATABASE_USER: z.string().trim().min(1),
    DATABASE_PASSWORD: z.string().min(1)
});

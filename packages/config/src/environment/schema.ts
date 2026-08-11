import { z } from "zod";

const environmentBoolean = z.preprocess((value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}, z.boolean());

export const environmentSchema = z.object({
  HOST_NAME: z.string().trim().min(1),
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.coerce.number().int().positive(),
  TENANT_IS_ENABLED: environmentBoolean
});

export type Environment = z.infer<typeof environmentSchema>;

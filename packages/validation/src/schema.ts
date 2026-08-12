import { z } from "zod";

export const stringSchema = z.string();
export const nonEmptyStringSchema = z.string().min(1);
export const positiveIntegerSchema = z.number().int().positive();

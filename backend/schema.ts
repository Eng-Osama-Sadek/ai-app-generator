import { z } from 'zod';

export const AppConfigSchema = z.object({
  appName: z.string().default("DynamicApp"),
  tables: z.array(z.object({
    name: z.string(),
    fields: z.array(z.object({
      name: z.string(),
      type: z.enum(['string', 'number', 'boolean']),
      required: z.boolean().default(false)
    }))
  })).default([])
});
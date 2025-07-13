import z from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
});

export const env = envSchema.safeParse(import.meta.env);

if (!env.success) {
  throw new Error('Invalid environment variables');
}

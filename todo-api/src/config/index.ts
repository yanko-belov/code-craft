import { z } from 'zod';

/**
 * Environment configuration schema with validation
 */
const ConfigSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default('0.0.0.0'),

  // Logging
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  // Rate limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(100),

  // CORS
  CORS_ORIGIN: z.string().default('*'),

  // API
  API_VERSION: z.string().default('v1'),
});

type Config = z.infer<typeof ConfigSchema>;

/**
 * Validated configuration object
 */
function loadConfig(): Config {
  const result = ConfigSchema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment configuration:');
    console.error(result.error.format());
    process.exit(1);
  }

  return result.data;
}

export const config = loadConfig();

/**
 * Check if running in production
 */
export const isProduction = config.NODE_ENV === 'production';

/**
 * Check if running in development
 */
export const isDevelopment = config.NODE_ENV === 'development';

/**
 * Check if running in test
 */
export const isTest = config.NODE_ENV === 'test';

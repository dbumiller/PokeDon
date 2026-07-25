/**
 * Sequelize database initialization module for PokeDon.
 * Strategy: Decoupled, environment-agnostic connection pooling using standard NodeNext ESM.
 * Requirements:
 * 1. Validate environment variables (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT).
 * 2. Configure a connection pool with max 10, min 2 connections, 30s acquire, 10s idle.
 * 3. Implement an automatic retry mechanism for transient Sequelize connection errors (max 5 retries).
 * 4. Export a singleton instance named 'sequelize'.
 */

import { Sequelize, Dialect } from 'sequelize';

// Fails fast if variables are missing or invalid
const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT'] as const;

function getRequiredEnv(name: typeof requiredEnv[number]): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const DB_NAME = getRequiredEnv('DB_NAME');
const DB_USER = getRequiredEnv('DB_USER');
const DB_PASSWORD = getRequiredEnv('DB_PASSWORD');
const DB_HOST = getRequiredEnv('DB_HOST');
const DB_PORT = Number.parseInt(getRequiredEnv('DB_PORT'), 10);

if (Number.isNaN(DB_PORT) || DB_PORT <= 0) {
  throw new Error('Invalid DB_PORT environment variable. It must be a positive integer.');
}

// Falls back to postgres if DB_DIALECT is not defined
const DB_DIALECT = (process.env.DB_DIALECT ?? 'postgres') as Dialect;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  // Always keeps 2 connections available, allows up to 10, waits 30 seconds for a connection before an error, closes after idling for 10 seconds
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const transientConnectionErrorNames = new Set([
  'SequelizeConnectionError',
  'SequelizeConnectionRefusedError',
  'SequelizeHostNotFoundError',
  'SequelizeHostNotReachableError',
  'SequelizeInvalidConnectionError',
  'SequelizeConnectionTimedOutError',
]);

// Checks for a defined error that can be retried
function isTransientSequelizeError(error: unknown): boolean {
  if (error instanceof Error) {
    if (transientConnectionErrorNames.has((error as any).name)) {
      return true;
    }

    const message = error.message.toLowerCase();
    return message.includes('timeout') || message.includes('timed out') || message.includes('connection refused') || message.includes('host not found') || message.includes('host not reachable');
  }

  return false;
}

// Executes retries on specific errors
async function authenticateWithRetry(instance: Sequelize, maxRetries = 5): Promise<void> {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      await instance.authenticate();
      return;
    } catch (error) {
      attempt += 1;
      if (attempt > maxRetries || !isTransientSequelizeError(error)) {
        throw error;
      }

      const delayMs = attempt * 1000;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

// Uses retry error handling to see if there is a successful connection, commented out for test suite
// void authenticateWithRetry(sequelize).catch((error) => {
//  console.error('Failed to initialize sequelize connection after retries:', error);
// });

export { sequelize };
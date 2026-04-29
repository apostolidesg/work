import { logger } from '@/util/Logger';
import dotenv from 'dotenv';
import { app } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

function getEnvPath(filename) {
  // Check if we're in a packaged Electron app
  const isPackaged = app.isPackaged;

  if (isPackaged) {
    // In packaged app, look in the resources directory
    return path.join(process.resourcesPath, filename);
  } else {
    // In development, look in the project root
    return path.resolve(process.cwd(), filename);
  }
}

export default function loadEnv() {
  const isProduction =
    process.argv.some(arg => arg.includes('package') || arg.includes('make')) ||
    process.env.NODE_ENV === 'production' ||
    app.isPackaged;

  const envFile = isProduction ? '.env.production' : '.env.development';
  const envPath = getEnvPath(envFile);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    logger.info(`Loaded environment from ${envFile}`);
  } else {
    logger.info(`Warning: ${envFile} not found at ${envPath}`);
  }

  return {
    FORGE_NODE_ENV: process.env.FORGE_NODE_ENV,
    MOCK_WS_CONNECTION: process.env.MOCK_WS_CONNECTION,
    IPC_RENDERER_ENABLED: process.env.IPC_RENDERER_ENABLED,
    HAL_MIDDLEWARE_URL: process.env.HAL_MIDDLEWARE_URL,
    VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL,
    VITE_BUILD_DIR_NAME: process.env.VITE_BUILD_DIR_NAME,
    VITE_ERROR_PAGE_DIR_NAME: process.env.VITE_ERROR_PAGE_DIR_NAME,
  };
}

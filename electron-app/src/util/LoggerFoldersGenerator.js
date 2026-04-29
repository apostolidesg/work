import { app } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

const isWindows = process.platform === 'win32';
const nonWindowsDir = app.getPath('home');
const baseDir = isWindows ? 'C:/' : nonWindowsDir;

const loggerPaths = {
  general: path.join(baseDir, 'KinoSSBTLogs'),
  frontend: path.join(baseDir, 'KinoSSBTLogs', 'frontend'),
};

const triggerGenerator = () => {
  if (!fs.existsSync(loggerPaths.general)) {
    fs.mkdirSync(loggerPaths.general, { recursive: true });
  }
  if (!fs.existsSync(loggerPaths.frontend)) {
    fs.mkdirSync(loggerPaths.frontend, { recursive: true });
  }
};

export default {
  loggerPaths,
  triggerGenerator,
};

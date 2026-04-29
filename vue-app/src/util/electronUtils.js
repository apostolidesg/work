import { ELECTRON_EVENTS } from '../constants/stringConstants';
import EventTypes from '../handler/EventTypes';

/**
 * Load configuration from Electron using available interfaces
 * Tries both electronAPI and direct require approaches
 * @returns {Promise<object>} Configuration object
 * @throw {Error} If no Electron interface is available
 */

export const loadConfiguration = async () => {
  try {
    if (window.electronAPI) {
      return await window.electronAPI.invokeMain(ELECTRON_EVENTS.LOAD_CONFIGURATION);
    }

    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      return ipcRenderer.sendSync(EventTypes.LOAD_CONFIGURATION);
    }
  } catch (error) {
    throw error;
  }
};

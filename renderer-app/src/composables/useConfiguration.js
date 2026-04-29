import { computed } from 'vue';
import { useStore } from 'vuex';
import configurationModuleTypes from '@/store/modules/ConfigurationStoreModule/types';
import moduleTypes from '@/store/modules/types/types';

const MODULE_PATH = moduleTypes.CONFIGURATION_STORE_MODULE;

export function useConfiguration() {
  const store = useStore();

  const getGetter = (getterName) => computed(() => store.getters[`${MODULE_PATH}/${getterName}`]);

  const appConfig = getGetter(configurationModuleTypes.getters.GET_CONFIGURATION);
  const isDevelopmentMode = getGetter(configurationModuleTypes.getters.IS_DEVELOPMENT_MODE);
  const configurationAssets = getGetter(configurationModuleTypes.getters.GET_CONFIGURATION_ASSETS);
  const getVoucherMessage = getGetter(configurationModuleTypes.getters.GET_VOUCHER_MESSAGE);

  const setConfiguration = (configuration) =>
    store.dispatch(`${MODULE_PATH}/${configurationModuleTypes.actions.SET_CONFIGURATION}`, { configuration });

  const initConfiguration = (electronEnv) =>
    store.dispatch(`${MODULE_PATH}/${configurationModuleTypes.actions.INIT_CONFIGURATION}`, { electronEnv });

  return {
    appConfig,
    isDevelopmentMode,
    configurationAssets,
    getVoucherMessage,
    setConfiguration,
    initConfiguration,
  };
}

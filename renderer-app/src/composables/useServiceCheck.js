import { computed } from 'vue';
import { useStore } from 'vuex';
import serviceCheckModuleTypes from '@/store/modules/ServiceCheckStoreModule/types';
import moduleTypes from '@/store/modules/types/types';

const MODULE_PATH = moduleTypes.SERVICE_CHECK_STORE_MODULE;

export function useServiceCheck() {
  const store = useStore();

  const isMaintenance = computed(
    () => store.getters[`${MODULE_PATH}/${serviceCheckModuleTypes.getters.GET_MAINTENANCE}`]
  );

  const isCashoutAvailable = computed(
    () => store.getters[`${MODULE_PATH}/${serviceCheckModuleTypes.getters.GET_CASHOUT}`]
  );

  const changeServiceAvailability = (serviceStatus) =>
    store.dispatch(`${MODULE_PATH}/${serviceCheckModuleTypes.actions.CHANGE_SERVICE_AVAILABILITY}`, { serviceStatus });

  return {
    isMaintenance,
    isCashoutAvailable,
    changeServiceAvailability,
  };
}

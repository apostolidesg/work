<template>
  <div class="toggle-type__container h-100 d-flex flex-column align-content-center justify-content-center">
    <div class="toggle-type__switch-container d-flex justify-content-around align-items-center">
      <toggle-button :toggleProps="getToggleButtonProps('simple')" />
      <toggle-switch :toggleProps="getToggleSwitchProps" />
      <toggle-button :toggleProps="getToggleButtonProps('sidebets')" />
    </div>
    <div class="toggle-type__label text-center text-white">{{ $t('selectThemeType') }}</div>
  </div>
</template>

<script>
import moduleTypes from '../../../../../store/modules/types';
import liveDrawTypes from '../../../../../store/modules/LiveDrawModule/types';
import { mapActions, mapGetters } from 'vuex';
import { get } from 'lodash';
import ToggleButton from './ToggleButton';
import ToggleSwitch from './ToggleSwitch';
import configurationModuleTypes from '../../../../../store/modules/ConfigurationStoreModule/types';

export default {
  name: 'simple-sidebets-toggle',
  components: {
    ToggleButton,
    ToggleSwitch,
  },
  computed: {
    ...mapGetters(moduleTypes.LIVE_DRAW_MODULE, {
      getSelectedTheme: liveDrawTypes.getters.GET_SELECTED_THEME,
      getSelectedThemeType: liveDrawTypes.getters.GET_SELECTED_THEME_TYPE,
      getDefaultTheme: liveDrawTypes.getters.GET_DEFAULT_THEME,
    }),
    ...mapGetters(moduleTypes.CONFIGURATION_STORE_MODULE, {
      getLiveDrawThemes: configurationModuleTypes.getters.GET_LIVE_DRAW_THEMES,
    }),
    switchPositionRight() {
      return this.getSelectedThemeType === 'sidebets' ? 1 : 0;
    },
    getNewThemeFromToggle() {
      return this.getLiveDrawThemes[this.getSelectedThemeType].list[this.getSelectedTheme];
    },
    getDefaultThemeOfType() {
      return this.getLiveDrawThemes[this.getSelectedThemeType].list.classic;
    },
    getToggleSwitchProps() {
      return {
        switchPosition: this.switchPositionRight,
        toggleTheme: this.toggleTheme,
      };
    },
  },
  methods: {
    ...mapActions(moduleTypes.LIVE_DRAW_MODULE, {
      toggleThemeType: liveDrawTypes.actions.TOGGLE_SELECTED_THEME_TYPE,
      updateThemeType: liveDrawTypes.actions.UPDATE_SELECTED_THEME_TYPE,
      updateTheme: liveDrawTypes.actions.UPDATE_SELECTED_THEME,
    }),
    getToggleButtonProps(type) {
      // TODO check if this can be retrieved from the store
      return {
        isToggleSelected: this.isThemeTypeSelected(type),
        imageSrc: this.getImage(type),
        setManualThemeType: () => this.setManualThemeType(type),
      };
    },
    getImage(type) {
      const { image } = this.getLiveDrawThemes[type];
      const activeClass = this.isThemeTypeSelected(type) ? '-active' : '';
      return require(`../../../../../assets/${image + activeClass}.png`);
    },
    isThemeTypeSelected(theme) {
      return this.getSelectedThemeType === theme;
    },
    setManualThemeType(type) {
      this.updateThemeType(type);
      this.setTheme();
    },
    setTheme() {
      const theme = get(this.getNewThemeFromToggle, 'id');
      !theme && this.updateTheme(this.getDefaultTheme);
      this.$eventHub.$emit('slideToSwiper');
    },
    toggleTheme() {
      this.toggleThemeType();
      this.setTheme();
    },
  },
};
</script>
<style>
.toggle-type__container {
  border-right: 3px solid #5a8fa5;
  background: #1a657a;
}
.toggle-type__switch-container {
  max-height: 85px;
  overflow: hidden;
}
</style>

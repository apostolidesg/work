<template functional>
  <!--TODO check if this is the correct way-->
  <div v-on="{click:!props.toggleProps.isToggleSelected ? props.toggleProps.setManualThemeType : ()=>false}"
       :class="{'active-theme-type' : props.toggleProps.isToggleSelected}"
       class="toggle-type">
    <img class="toggle-type__image" :src="props.toggleProps.imageSrc"/>
  </div>
</template>
<style scoped>
  .toggle-type__image {
    width: auto;
    max-height: 120px;
  }

  .toggle-type {
    opacity: 0.5;
  }

  .toggle-type.active-theme-type {
    opacity: 1;
  }
</style>

<template functional>
    <div class="material-switch" :class="{'switch-active-right' : props.toggleProps.switchPosition}" @click="props.toggleProps.toggleTheme" ></div>
</template>
<style scoped>
  .material-switch {
    cursor: pointer;
    height: 0px;
    position: relative;
    width: 40px;
  }

  .material-switch::before {
    background: #1d87dd;
    border-radius: 8px;
    content: '';
    height: 16px;
    margin-top: -8px;
    position: absolute;
    transition: all 0.4s ease-in-out;
    width: 40px;
  }

  .material-switch::after {
    background: #f5bc25;
    border-radius: 16px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    content: '';
    height: 24px;
    left: -4px;
    margin-top: -8px;
    position: absolute;
    top: -4px;
    transition: all 0.3s ease-in-out;
    width: 24px;
  }

  .material-switch.switch-active-right::before {
    background: #f5bc25;
  }

  .material-switch.switch-active-right::after {
    background: #1d87dd;
    left: 20px;
  }
</style>

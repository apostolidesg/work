<template functional>
  <div :class="{'is-theme-active':props.isActive}"
       v-on="{click:!props.isActive ? listeners.setTheme : ()=>false}"
        class="theme-selector-item">
    <div class="theme-selector-item__container">
      <img class="theme-thumbnail__image" width=100% height="100%" :src="props.image"/>
      <figcaption>{{props.content}}</figcaption>
    </div>
  </div>
</template>

<style scoped>
  .theme-selector-item.is-theme-active{
    background: #1e4e5c;
    color:#d6aa2c;
    border-radius: 10px;
  }
  .theme-selector-item {
    padding: 5px;
    margin-top: 4px;
    font-size: .9rem;
    color:white;
    text-align: center;
  }
  .theme-thumbnail__image{
    border-radius: 5px;
    height: 81px;
  }
</style>

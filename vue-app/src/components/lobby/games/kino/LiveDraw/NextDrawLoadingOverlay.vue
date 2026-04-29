<template functional>
  <div class="loading-overlay d-flex h-100">
    <div class="col-12 main-loading-area d-flex justify-content-center align-items-center flex-column" :style="data.style">
        <slot/>
      <div class="loading-caption">{{props.text}}</div>
    </div>
  </div>
</template>
<style scoped>
  .loading-overlay{
    color: white;
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .loading-caption{
    padding-top: 30px;
  }
</style>

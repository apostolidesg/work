<template>
  <div class="kino-preview-ball rounded-circle" :class="className">{{displayValue}}</div>
</template>

<style scoped>
  .kino-preview-ball {
    display: block;
    padding: 0px 0px 0px 0px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    font-weight: 900;
    line-height: 26px;
    width: 23px;
    height: 23px;
    margin: 1px 2px 1px 2px;
    box-shadow: 0px 0px 0px 1px rgba(255,255,255,1);
  }
  .kino-preview-ball--small {
    color: #d02700;
    line-height: 20px;
    width: 20px;
    height: 20px;
    font-size: 13.11px;
  }
  .kino-preview-ball--active {
    color: #123d52;
    background-color: #f5be20;
    box-shadow: 0px 0px 7px 1px rgba(245,190,32,1);
  }
  .kino-preview-ball--active-bonus {
    color: #fff;
    background-color: #e1001a;
    box-shadow: 0px 0px 7px 1px rgba(225,0,26,1);
  }
  .kino-preview-ball--active-won { }
</style>

<script>
const THEME_LIST = ['', 'small'];

export default {
  name: 'ball-element',
  props: {
    theme: {
      type: String,
      default: '',
      validator: value => THEME_LIST.includes(value)
    },
    displayValue: {
      type: [String, Number],
      default: '',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isBonus: {
      type: Boolean,
      default: false,
    },
    isWon: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    className() {
      return {
        [`kino-preview-ball--${this.theme}`]: this.theme,
        'kino-preview-ball--active': this.isActive && !this.isBonus,
        'kino-preview-ball--active-bonus': this.isActive && this.isBonus,
        'kino-preview-ball--active-won': this.isActive && !this.isBonus && this.isWon
      };
    },
  }
}
</script>

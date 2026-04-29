<template>
  <div class="powerspin-stepper">
    <StepperItem
      v-for="(step, stepIndex) in steps"
      :key="stepIndex"
      :has-wheel="isWheelPresent(stepIndex) && isActive"
      :is-selected="hasWheelSelections(stepIndex) && isActive"
      :show-next="!isStepLast(stepIndex) && numOfWheels === stepIndex + 1 && isActive"
      :is-last="isStepLast(stepIndex)"
      @arrow-click="handleArrowClicked(stepIndex)"
    >
      <component :is="activeLogo(stepIndex)" v-bind="logoConfig(stepIndex)" @click="logoSelected(stepIndex)" />
    </StepperItem>
  </div>
</template>

<script>
import StepperItem from './StepperItem.vue';
import PowerSpinLogo from './PowerspinLogo.vue';
import Compo2Dark from '../../../../../assets/power-spin/compo2-dark.svg?inline';
import Compo2White from '../../../../../assets/power-spin/compo2-white.svg?inline';
import Compo2WhiteSelected from '../../../../../assets/power-spin/compo2-white--selected.svg?inline';
import Compo3Dark from '../../../../../assets/power-spin/compo3-dark.svg?inline';
import Compo3White from '../../../../../assets/power-spin/compo3-white.svg?inline';
import Compo3WhiteSelected from '../../../../../assets/power-spin/compo3-white--selected.svg?inline';

const STEPS_ARRAY = [
  {
    default: 'PowerSpinLogo',
    empty: 'PowerSpinLogo',
    notEmpty: 'PowerSpinLogo',
  },
  {
    default: 'Compo2Dark',
    empty: 'Compo2White',
    notEmpty: 'Compo2WhiteSelected',
  },
  {
    default: 'Compo3Dark',
    empty: 'Compo3White',
    notEmpty: 'Compo3WhiteSelected',
  },
];

export default {
  name: 'Stepper',
  components: {
    StepperItem,
    PowerSpinLogo,
    Compo2Dark,
    Compo2White,
    Compo2WhiteSelected,
    Compo3Dark,
    Compo3White,
    Compo3WhiteSelected,
  },
  props: {
    wheels: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    numOfWheels() {
      return this.wheels.length;
    },
  },
  methods: {
    hasWheelSelections(wheelIndex) {
      return !this.wheels[wheelIndex]?.isEmpty();
    },
    isWheelPresent(wheelIndex) {
      return this.numOfWheels >= wheelIndex + 1;
    },
    isStepLast(stepIndex) {
      return stepIndex === this.steps.length - 1;
    },
    handleArrowClicked(stepIndex) {
      this.logoSelected(stepIndex + (stepIndex === this.steps.length - 1 ? -1 : 1));
    },
    logoSelected(stepIndex) {
      this.$emit('logo-click');
      if (this.numOfWheels > stepIndex + 1) {
        this.$emit('remove-wheels-after-index', stepIndex);
      } else if (this.numOfWheels < stepIndex + 1) {
        const wheelsToAdd = stepIndex + 1 - this.numOfWheels;
        this.$emit('add-wheels', wheelsToAdd);
      }
    },
    activeLogo(wheelIndex) {
      if (!this.isActive) {
        return this.steps[wheelIndex].default;
      }
      if (!this.isWheelPresent(wheelIndex)) {
        return this.steps[wheelIndex].default;
      }
      if (!this.hasWheelSelections(wheelIndex)) {
        return this.steps[wheelIndex].empty;
      }
      return this.steps[wheelIndex].notEmpty;
    },
    logoConfig(stepIndex) {
      return { ...(stepIndex === 0 && { isSelected: this.hasWheelSelections(stepIndex) || !this.isActive }) };
    },
  },
  created() {
    this.steps = STEPS_ARRAY;
  },
};
</script>

<style scoped>
.powerspin-stepper {
  flex: 1;
  height: 106px;
  background: linear-gradient(180deg, #d3edfd 0%, #f5fbfe 14.06%, #f4fafe 89.58%, #d3edfd 100%);
  display: flex;
}
</style>

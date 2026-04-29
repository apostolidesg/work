<template>
  <InfoModalWrapper :visible="isVisible" @close="closeModal" :theme="event.type" :messages="event.message">
    <template #body>
      <InfoModalBodyDefault :icon="event.icon" :title="event.title" :message="event.message" :theme="event.type"/>
    </template>
  </InfoModalWrapper>
</template>

<script>
/* eslint-disable */
import AutoCloseMixin from '../../mixins/AutoCloseMixin';
import modalEventConstants from '../../util/modalEventConstants';
import InfoModalWrapper from './InfoModalWrapper';
import InfoModalBodyDefault from './InfoModalBodyDefault';

const EVENT_DEFAULTS = {
  title: '',
  type: '',
  icon: null,
  message: null,
};

export default {
  name: 'InfoModal',
  mixins: [ AutoCloseMixin ],
  components: {
    InfoModalWrapper,
    InfoModalBodyDefault,
  },
  data() {
    return {
      isVisible: false,
      event: {...EVENT_DEFAULTS},
      closeCallback: null
    };
  },
  created() {
    this.$eventHub.$on(modalEventConstants.OPEN.INFO, this.openModal);
    this.$eventHub.$on(modalEventConstants.CLOSE.ALL_MODALS, this.closeModal);
  },
  beforeDestroy(){
    this.$eventHub.$off(modalEventConstants.OPEN.INFO);
    this.$eventHub.$off(modalEventConstants.CLOSE.ALL_MODALS);
  },
  methods: {
    closeModal() {
      this.isVisible = false;
      this.event = {...EVENT_DEFAULTS};
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, false, this.closeCallback);
      this.clearAutoCloseTimer();
    },
    openModal(event, closeCallback = null, useAutoCloseTimer = false) {
      this.event = {...event};
      this.isVisible = true;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, true);
      this.closeCallback = closeCallback;
      useAutoCloseTimer && this.triggerAutoCloseTimer(this.closeModal);
    },
  },
}
</script>

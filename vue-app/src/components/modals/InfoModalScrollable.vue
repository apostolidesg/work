<template>
  <InfoModalWrapper :visible="isVisible" @close="closeInfo">
    <template #header>
      <h4 v-if="event && event.title" class="info-modal__body-title text-center" id="infoTitle">
        {{ $t(event.title) }}
      </h4>
    </template>
    <template #body>
      <div class="info-modal__body text-white w-100 position-relative bg-transparent px-2 py-4">
        <vue-scroll :ops="scrollerOps">
          <div
            v-if="event && event.message"
            id="infoMessage"
            class="info-modal__message"
            v-html="$t(event.message)"
          ></div>
        </vue-scroll>
      </div>
    </template>
  </InfoModalWrapper>
</template>

<script>
/* eslint-disable */
import InfoModalWrapper from './InfoModalWrapper';
import { simple } from '../../util/ScrollerConfig';
import modalEventConstants from "../../util/modalEventConstants";

export default {
  name: 'InfoModalScrollable',
  components: {
    InfoModalWrapper,
  },
  data() {
    return {
      scrollerOps: simple,
      isVisible: false,
      event: null,
    };
  },
  created() {
    this.$eventHub.$on(modalEventConstants.OPEN.INFO_SCROLLABLE, this.openInfo);
  },
  beforeDestroy() {
    this.$eventHub.$off(modalEventConstants.OPEN.INFO_SCROLLABLE, this.openInfo);
  },
  methods: {
    closeInfo() {
      this.isVisible = false;
      this.event = null;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, false);
    },
    openInfo(event) {
      this.event = event;
      this.isVisible = true;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, true);
    },
  },
};
</script>

<style scoped>
.info-modal__body {
  height: 300px;
}
.info-modal__message {
  padding-right: 20px;
}
.info-modal__body h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
}

.info-modal__body ul {
  padding-left: 26px;
}
</style>

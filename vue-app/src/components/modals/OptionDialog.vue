<template>
  <InfoModalWrapper :visible="isVisible" :closeButton="false">
    <template #body>
      <InfoModalBodyDefault v-if="event" :icon="event.icon" :title="event.title" :message="event.message" />
    </template>
    <template #footer>
      <InfoModalFooterButton id="no-option" @click="dismissDialog" :game="generalGameType" class="mr-3">
        {{ $t('no') }}
      </InfoModalFooterButton>
      <InfoModalFooterButton id="yes-option" @click="confirmDialog" :game="generalGameType">
        {{ $t('yes') }}
      </InfoModalFooterButton>
    </template>
  </InfoModalWrapper>
</template>

<script>
/* eslint-disable */
import InfoModalWrapper from './InfoModalWrapper';
import InfoModalBodyDefault from './InfoModalBodyDefault';
import InfoModalFooterButton from './InfoModalFooterButton';
import isFunction from 'lodash/isFunction';
import modalEventConstants from "../../util/modalEventConstants";
import fontawesome from '@fortawesome/fontawesome';
import faQuestion from '@fortawesome/fontawesome-free-solid/faQuestion';
import Constants from "../../util/Constants";
import {mapState} from "vuex";
import moduleTypes from "../../store/modules/types";
import SessionStoreModuleTypes from "../../store/modules/SessionStoreModule/types";

fontawesome.library.add(faQuestion);


const GAME_TYPE_MAPPER = {
  [Constants.GENERAL_GAME_TYPES.KINO]: 'kino',
  [Constants.GENERAL_GAME_TYPES.POWERSPIN]: 'powerspin',
  [Constants.GENERAL_GAME_TYPES.EUROJACKPOT]: 'eurojackpot',
};

export default {
  name: 'OptionDialog',
  components: {
    InfoModalWrapper,
    InfoModalBodyDefault,
    InfoModalFooterButton,
  },
  data() {
    return {
      isVisible: false,
      event: null,
      callback: null,
      rejectionCallback: null
    };
  },
  created() {
    this.$eventHub.$on(modalEventConstants.OPEN.DIALOG, this.showDialog);
    this.$eventHub.$on(modalEventConstants.CLOSE.ALL_MODALS, this.dismissDialog);
  },
  beforeDestroy() {
    this.$eventHub.$off(modalEventConstants.OPEN.DIALOG);
    this.$eventHub.$off(modalEventConstants.CLOSE.ALL_MODALS);
  },
  computed: {
    ...mapState(moduleTypes.SESSION_STORE_MODULE, {
      gameType: SessionStoreModuleTypes.state.GAME_TYPE,
    }),
    generalGameType() {
      return GAME_TYPE_MAPPER[this.gameType] || 'lobby';
    },
  },
  methods: {
    showDialog(event, callback, rejectionCallback) {
      this.event = event;
      this.callback = callback;
      this.rejectionCallback = rejectionCallback;
      this.isVisible = true;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, true);
    },
    dismissDialog() {
      this.event = null;
      this.callback = null;
      isFunction(this.rejectionCallback) && this.rejectionCallback();
      this.rejectionCallback = null;
      this.isVisible = false;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, false);
    },
    confirmDialog() {
      this.isVisible = false;
      isFunction(this.callback) && this.callback();
      this.event = {};
      this.callback = null;
      this.$eventHub.$emit(modalEventConstants.GENERIC.MODAL_ACTIVE, false);
    },
  }
};
</script>

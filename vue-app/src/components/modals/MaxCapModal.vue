<template>
  <InfoModalWrapper :visible="isVisible" :closeButton="false">
    <template #body>
      <InfoModalBodyDefault :icon="icon" :title="title" :message="message" />
    </template>
    <template #footer>
      <InfoModalFooterButton id="edit-option" @click="onEdit" class="mr-3">
        {{ $t('edit') }}
      </InfoModalFooterButton>
      <InfoModalFooterButton id="cancel-option" @click="onCancel">{{ $t('canceling') }}</InfoModalFooterButton>
    </template>
  </InfoModalWrapper>
</template>

<script>
import AutoCloseMixin from '../../mixins/AutoCloseMixin';
import InfoModalWrapper from './InfoModalWrapper';
import InfoModalBodyDefault from './InfoModalBodyDefault';
import { modalTypes, modalTypesToIcons } from '../../util/infoModalConstants';
import InfoModalFooterButton from './InfoModalFooterButton';
import modalEventConstants from '../../util/modalEventConstants';

export default {
  name: 'MaxCupModal',
  mixins: [AutoCloseMixin],
  components: {
    InfoModalWrapper,
    InfoModalBodyDefault,
    InfoModalFooterButton,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  created() {
    this.type = modalTypes.DIALOG;
    this.icon = modalTypesToIcons[this.type];
    this.title = 'wagerCap';
    this.message = { translationLabel: 'wagerCapWarningModalMessage' };
    this.$eventHub.$on(modalEventConstants.OPEN.WAGER_CAP, this.showDialog);
  },
  beforeDestroy() {
    this.$eventHub.$off(modalEventConstants.OPEN.WAGER_CAP);
  },
  methods: {
    showDialog() {
      this.isVisible = true;
    },
    onEdit() {
      this.isVisible = false;
    },
    onCancel() {
      this.$eventHub.$emit('clearBetslip');
      this.isVisible = false;
    },
  },
};
</script>

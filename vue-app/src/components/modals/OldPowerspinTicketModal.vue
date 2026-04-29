<template>
  <InfoModalWrapper :visible="isVisible" :closeButton="false">
    <template #body>
      <InfoModalBodyDefault :icon="icon" :title="title" :message="message" />
    </template>
    <template #footer>
      <InfoModalFooterButton id="edit-option" @click="handleEdit" class="mr-3">
        {{ $t('edit') }}
      </InfoModalFooterButton>
      <InfoModalFooterButton id="cancel-option" @click="handleCancel">{{ $t('canceling') }}</InfoModalFooterButton>
    </template>
  </InfoModalWrapper>
</template>

<script>
import AutoCloseMixin from '../../mixins/AutoCloseMixin';
import InfoModalWrapper from './InfoModalWrapper';
import InfoModalBodyDefault from './InfoModalBodyDefault';
import InfoModalFooterButton from './InfoModalFooterButton';
import { modalTypes, modalTypesToIcons } from '../../util/infoModalConstants';
import modalEventConstants from '../../util/modalEventConstants';

export default {
  name: 'OldPowerspinTicketModal',
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
    this.onEdit = null;
    this.onCancel = null;
    this.title = 'columnPriceChanged';
    this.message = { translationLabel: 'columnPriceChangedModalMessage' };
    this.$eventHub.$on(modalEventConstants.OPEN.OLD_TICKET_SCANNED, this.showDialog);
  },
  beforeDestroy() {
    this.$eventHub.$off(modalEventConstants.OPEN.OLD_TICKET_SCANNED);
  },
  methods: {
    showDialog(onEdit = null, onCancel = null) {
      this.onEdit = onEdit;
      this.onCancel = onCancel;
      this.isVisible = true;
    },
    handleEdit() {
      this.onEdit && this.onEdit();
      this.isVisible = false;
      this.onEdit = null;
      this.onCancel = null;
    },
    handleCancel() {
      this.onCancel && this.onCancel();
      this.isVisible = false;
      this.onEdit = null;
      this.onCancel = null;
    },
  },
};
</script>

import Constants from './Constants';
import moment from 'moment';
import { modalTypes, modalTypesToIcons } from './infoModalConstants';

export default {
  isFreeTicket(data) {
    return data.status === Constants.PROMOTIONS_VOUCHER_STATUS.FREE;
  },
  isSecondChanceDrawTickets(data) {
    return data.outcomeType === Constants.PROMOTIONS_VOUCHER_OUTCOME_TYPE.SECOND_CHANCE;
  },
  isInstantWinTickets(data) {
    return data.outcomeType === Constants.PROMOTIONS_INSTANT_WIN_OUTCOME;
  },
  isRaffleTicket(data) {
    return data.isRaffle;
  },
  isExpired(purgeDate, currentDate) {
    return purgeDate.isBefore(currentDate);
  },
  isActive(purgeDate, currentDate) {
    return purgeDate.isAfter(currentDate);
  },
  handlePromotionVoucherResponse(response, brandName) {
    const promotionVoucherInfoObject = {
      type: modalTypes.INFO,
      icon: modalTypesToIcons[modalTypes.INFO],
      message: { translationLabel: '' },
    };

    if (!response?.success) {
      promotionVoucherInfoObject.type = modalTypes.ERROR;
      promotionVoucherInfoObject.icon = modalTypesToIcons[modalTypes.ERROR];
      promotionVoucherInfoObject.message.translationLabel = Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_INVALID;
      return promotionVoucherInfoObject;
    }

    const currentMoment = moment();
    const firstObjectData = response.data[0];
    const firstObjectPurgeDate = moment.unix(firstObjectData.purgeDate);

    const isFree = this.isFreeTicket(firstObjectData);
    const isActive = this.isActive(firstObjectPurgeDate, currentMoment);
    const isExpired = this.isExpired(firstObjectPurgeDate, currentMoment);
    const isSecondChance = this.isSecondChanceDrawTickets(firstObjectData);
    const isInstantWin = this.isInstantWinTickets(firstObjectData);
    const isRaffle = this.isRaffleTicket(firstObjectData);
    const { outcomeType, status } = firstObjectData;

    if (isFree && isActive) {
      if (isSecondChance && !isRaffle) {
        promotionVoucherInfoObject.message.translationLabel =
          Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_NO_RAFFLE;
        promotionVoucherInfoObject.type = Constants.PROMOTIONS_MODAL_THEME;
      } else if (isRaffle) {
        const secondObjectData = response.data[1];
        const secondOutcome = secondObjectData.outcomeType;

        if (secondOutcome === Constants.PROMOTIONS_VOUCHER_OUTCOME_TYPE.NON_WIN) {
          promotionVoucherInfoObject.message.translationLabel =
            Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_RAFFLE_NO_WIN;
        } else if (secondOutcome === Constants.PROMOTIONS_VOUCHER_OUTCOME_TYPE.GIFTS) {
          promotionVoucherInfoObject.message.translationLabel =
            brandName === Constants.BRAND_NAMES.ALLWYN
              ? Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_RAFFLE_WIN_ALLWYN
              : Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_RAFFLE_WIN;
        }

        promotionVoucherInfoObject.type = Constants.PROMOTIONS_MODAL_THEME;
      } else if (isInstantWin) {
         promotionVoucherInfoObject.message.translationLabel = Constants.PROMOTIONS_VOUCHER_MESSAGES.INSTANT_WIN_SUCCESS;
      }
      return promotionVoucherInfoObject;
    }

    if (status === Constants.PROMOTIONS_VOUCHER_STATUS.CANCELLED && isSecondChance) {
      promotionVoucherInfoObject.message.translationLabel =
        Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_CANCELLED;
      promotionVoucherInfoObject.type = Constants.PROMOTIONS_MODAL_THEME;
      return promotionVoucherInfoObject;
    } else if(status === Constants.PROMOTIONS_VOUCHER_STATUS.CANCELLED && isInstantWin) {
      promotionVoucherInfoObject.message.translationLabel =
        Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_CANCELLED;
      promotionVoucherInfoObject.type = Constants.PROMOTIONS_MODAL_THEME;
      return promotionVoucherInfoObject;
    }

    if (isFree && isExpired) {
      if (outcomeType === Constants.PROMOTIONS_VOUCHER_OUTCOME_TYPE.SECOND_CHANCE) {
        promotionVoucherInfoObject.message.translationLabel =
          Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_EXPIRED;
      } else if (outcomeType === Constants.PROMOTIONS_VOUCHER_OUTCOME_TYPE.GIFTS) {
        promotionVoucherInfoObject.message.translationLabel = Constants.PROMOTIONS_VOUCHER_MESSAGES.GIFTS_EXPIRED;
      } else if (isInstantWin) {
        promotionVoucherInfoObject.message.translationLabel = Constants.PROMOTIONS_VOUCHER_MESSAGES.INSTANT_WIN_EXPIRED;
      }
      promotionVoucherInfoObject.type = Constants.PROMOTIONS_MODAL_THEME;
      return promotionVoucherInfoObject;
    }

    if (status === Constants.PROMOTIONS_VOUCHER_STATUS.REDEEMED) {
      if (isSecondChance) {
        promotionVoucherInfoObject.message.translationLabel =
          Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_REDEEMED;
      } else if (outcomeType === Constants.PROMOTIONS_VOUCHER_OUTCOME_TYPE.GIFTS) {
        promotionVoucherInfoObject.message.translationLabel = Constants.PROMOTIONS_VOUCHER_MESSAGES.GIFTS_REDEEMED;
      } else if (isInstantWin) {
        promotionVoucherInfoObject.message.translationLabel = Constants.PROMOTIONS_VOUCHER_MESSAGES.INSTANT_WIN_REDEEMED;
      }
      promotionVoucherInfoObject.type = Constants.PROMOTIONS_MODAL_THEME;
      return promotionVoucherInfoObject;
    }

    promotionVoucherInfoObject.message.translationLabel = Constants.PROMOTIONS_VOUCHER_MESSAGES.SECOND_CHANCE_INVALID;
    promotionVoucherInfoObject.type = modalTypes.ERROR;
    return promotionVoucherInfoObject;
  },
};

import { WsConnectionEventNames } from '@/constants/WsConnectionEventNames';

export const ErrorCodes = {
  [WsConnectionEventNames.WS_ERROR]: 1,
  [WsConnectionEventNames.WS_CONNECTION_FAILED]: 2,
  [WsConnectionEventNames.RECONNECT_FAILED]: 3,
};

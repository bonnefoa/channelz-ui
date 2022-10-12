import type { ChannelStateCell } from '../types/ChannelTypes';
import { connectivityStateStr } from "../utils/utils";

export const ChannelStateCellFormatter = (cell: ChannelStateCell): string => {
    const channelState = cell.getValue()
    return connectivityStateStr(channelState);
};

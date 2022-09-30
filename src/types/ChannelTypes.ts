import type {
  Getter,
} from "@tanstack/react-table";
import type { CallsData, TraceData } from './CommonTypes';

export interface ChannelRef {
    channel_id: number;
    name: string;
}

export interface SubchannelId {
    subchannel_id: number;
}

export interface ChannelState {
    state: number;
}

export interface ChannelStateCell {
    getValue: Getter<number>;
}

export interface ChannelData extends CallsData {
    state: ChannelState;
    target: string;
    trace: TraceData;
}

export interface ChannelResponse {
    ref: ChannelRef;
    data: ChannelData;
    subchannel_ref: SubchannelId[];

    // Added by channelz-proxy
    lb_policy: string;

    // Manually filled
    subchannels: ChannelResponse[];
}

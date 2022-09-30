import type { CallsData, TraceData } from './CommonTypes';

export interface SubchannelRef {
    subchannel_id: number;
}

export interface SubchannelState {
    state: number;
}

export interface SubchannelData extends CallsData {
    state: SubchannelState;
    target: string;
    trace: TraceData;
}

export interface SocketRef {
    socket_id: number;
    name: string;
}

export interface SubchannelResponse {
    ref: SubchannelRef;
    data: SubchannelData;
    socket_ref: SocketRef[];
}


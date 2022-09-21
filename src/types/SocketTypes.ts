import type { Timestamp } from './CommonTypes';

export interface SocketRef {
    socket_id: number;
    name: string;
}

export interface SocketData {
    streams_started: number;
    streams_succeeded: number;
    streams_failed: number;

    last_local_stream_created_timestamp: Timestamp;
    last_remote_stream_created_timestamp: Timestamp;

    keep_alives_sent: number;

    messages_sent: number;
    messages_received: number;
    last_message_sent_timestamp: Timestamp;
    last_message_received_timestamp: Timestamp;

    local_flow_control_window: number;
    remote_flow_control_window: number;
}

export interface SocketResponse {
    ref: SocketRef;
    data: SocketData;
}

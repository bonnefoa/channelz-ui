import type { CallsData } from './CommonTypes';
import type { SocketRef } from './SocketTypes';

export interface ServerRef {
    server_name: string;
    server_id: number;
}

export interface ServerResponse {
    ref: ServerRef;
    data: CallsData;
    listen_socket: SocketRef[];
}

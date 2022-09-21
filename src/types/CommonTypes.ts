import type {
  Getter,
} from "@tanstack/react-table";

export interface Timestamp {
    seconds: number;
    nanos: number;
}

export interface TimestampCell {
    getValue: Getter<Timestamp>;
}

export interface NumberCell {
    getValue: Getter<number>;
}

export interface CallsData {
    calls_started: number;
    calls_succeeded: number;
    calls_failed: number;
    last_call_started_timestamp: Timestamp;
}

export interface Event {
    description: string;
    severity: number;
    timestamp: Timestamp;
}

export interface TraceData {
    num_events_logged: number;
    creation_timestamp: Timestamp;
    events: Event[];
}

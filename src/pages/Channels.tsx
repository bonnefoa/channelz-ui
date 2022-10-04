import { createColumnHelper, Row, ColumnDef } from "@tanstack/react-table";
import { HostInput } from "../components/HostInput";
import { ConnectionError } from "../components/ConnectionError";
import { TableChannelz } from "../components/TableChannelz";
import * as React from "react";
import type { ChannelResponse } from "../types/ChannelTypes";
import { getBackendData } from "../utils/utils";
import { NumberCellFormatter } from "../components/CellNumber";
import { DateCellFormatter } from "../components/FormattedTime";
import { SubchannelList } from "../components/Subchannel";
import { EventList } from "../components/Events";
import { ChannelStateCellFormatter } from "../components/FormattedState";
import Offcanvas from "react-bootstrap/Offcanvas";
import type { Event } from "../types/CommonTypes";

export const Channels: React.FunctionComponent = () => {
  const [host, setHost] = React.useState("");
  const [lastClick, setLastClick] = React.useState(0);

  return (
    <div>
      <HostInput
        setHost={(value) => {
          setHost(value);
          setLastClick(Date.now());
        }}
      />
      Current host: {host}
      <ChannelList host={host} lastClick={lastClick} />
    </div>
  );
};

type ChannelListProps = {
  host: string;
  lastClick: number;
};

export const ChannelList: React.FunctionComponent<ChannelListProps> = ({
  host,
  lastClick,
}) => {
  const columnHelper = createColumnHelper<ChannelResponse>();
  const [channels, setChannels] = React.useState<ChannelResponse[]>([]);
  const [error, setError] = React.useState("");
  const [showEvents, setShowEvents] = React.useState(false);

  const [events, setEvents] = React.useState<Event[]>([]);
  const [eventChannelId, setEventChannelId] = React.useState<number>(0);

  const handleClose = () => setShowEvents(false);

  const callColumns: ColumnDef<ChannelResponse, any> = columnHelper.group({
    header: "Calls",
    columns: [
      columnHelper.accessor("data.calls_started", {
        header: "Started",
        cell: NumberCellFormatter,
      }),
      columnHelper.accessor("data.calls_succeeded", {
        header: "Succeeded",
        cell: NumberCellFormatter,
      }),
      columnHelper.accessor("data.calls_failed", {
        header: "Failed",
        cell: NumberCellFormatter,
      }),
      columnHelper.accessor("data.last_call_started_timestamp", {
        cell: DateCellFormatter,
        header: "Last Started",
      }),
    ],
  });

  const stateColumn: ColumnDef<ChannelResponse, any> = columnHelper.group({
    header: "State",
    columns: [
      columnHelper.accessor("data.state.state", {
        cell: ChannelStateCellFormatter,
        header: "State",
      }),
      columnHelper.accessor("lb_policy", {
        header: "LB Policy",
      }),
      columnHelper.accessor("data.trace.num_events_logged", {
        header: "Num events",
        cell: ({ row, getValue }) => (
          <a
            onClick={() => {
              setEvents(row.original.data.trace.events);
              setEventChannelId(row.original.ref.channel_id);
              setShowEvents(true);
            }}
            href="#"
          >
            {getValue()}
          </a>
        ),
      }),
    ],
  });

  const channelColumns: ColumnDef<ChannelResponse, any> = columnHelper.group({
    header: "Channel",
    columns: [
      columnHelper.accessor("ref.channel_id", {
        header: "ID",
        enableSorting: true,
        sortingFn: "basic",
        cell: ({ row, getValue }) => (
          <div
            onClick={() => {
              row.toggleExpanded();
            }}
          >
            {row.getIsExpanded() ? "▼" : "▶"} {getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("data.target", {
        header: "Target",
      }),
    ],
  });

  const columns: ColumnDef<ChannelResponse, any>[] = [
    channelColumns,
    stateColumn,
    callColumns,
  ];

  React.useEffect(() => {
    const parameters = new URLSearchParams({
      host: host,
    });
    getBackendData<ChannelResponse>(
      "channels",
      parameters,
      setError,
      setChannels
    );
  }, [host, lastClick]);

  const renderSubchannels = ({ row }: { row: Row<ChannelResponse> }) => {
    return (
      <SubchannelList
        host={host}
        lastClick={lastClick}
        setError={setError}
        subchannelIds={row.original.subchannel_ref}
      />
    );
  };

  return (
    <>
      <ConnectionError error={error} setError={setError} />
      <TableChannelz
        data={channels}
        columns={columns}
        initialSortingState={[{ id: "ref_channel_id", desc: false }]}
        renderSubComponent={renderSubchannels}
      />

      <Offcanvas
        show={showEvents}
        onHide={handleClose}
        placement={"end"}
        scroll={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Events for channel {eventChannelId}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <EventList events={events} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

import {
  createColumnHelper,
  Row,
  ColumnDef,
} from "@tanstack/react-table";
import { HostInput } from "../components/HostInput";
import { ConnectionError } from "../components/ConnectionError";
import { TableChannelz } from "../components/TableChannelz";
import * as React from "react";
import type { ChannelResponse } from "../types/ChannelTypes";
import { getBackendData } from "../utils/utils";
import { NumberCellFormatter } from "../components/CellNumber";
import { DateCellFormatter } from "../components/FormattedTime";
import { ChannelStateCellFormatter } from "../components/FormattedState";
import * as _tanstack_table_core from "@tanstack/table-core";

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
  const [subchannelMap, setSubchannelMap] = React.useState<{[id: number]: ChannelResponse[]}>({});
  const [error, setError] = React.useState("");

  const callColumns: ColumnDef<ChannelResponse, any> = columnHelper.group({
    header: "Calls",
    columns: [
      columnHelper.accessor("data.calls_started", {
        header: "Calls Started",
        cell: NumberCellFormatter,
      }),
      columnHelper.accessor("data.calls_succeeded", {
        header: "Calls Succeeded",
        cell: NumberCellFormatter,
      }),
      columnHelper.accessor("data.calls_failed", {
        header: "Calls Failed",
        cell: NumberCellFormatter,
      }),
      columnHelper.accessor("data.last_call_started_timestamp", {
        cell: DateCellFormatter,
        header: "Last Call Started",
      }),
    ],
  });

  const stateColumn: ColumnDef<ChannelResponse, any> = columnHelper.group({
    header: "State",
    columns: [
      columnHelper.accessor("data.state.state", {
        cell: ChannelStateCellFormatter,
        header: "Channel State",
      }),
      columnHelper.accessor("lb_policy", {
        header: "LB Policy",
      }),
    ],
  });

  const channelColumns: ColumnDef<ChannelResponse, any> = columnHelper.group({
    header: "Channel",
    columns: [
      columnHelper.accessor("ref.name", {
        header: "Channel Name",
        cell: ({ row, getValue }) => (
          <>
            <button
              onClick={() => {
                const parameters = new URLSearchParams({
                  host: host,
                  subchannelIds: row.original.subchannel_ref
                    .map((a) => a.subchannel_id)
                    .join(","),
                });
                getBackendData<ChannelResponse>(
                  "subchannels",
                  parameters,
                  setError,
                  (subchannels) => {
                      const channelId = row.original.ref.channel_id;
                      subchannelMap[channelId] = subchannels;
                      setSubchannelMap(subchannelMap);
                      row.toggleExpanded();
                  }
                );
              }}
            >
              {row.getIsExpanded() ? "v" : ">"}
            </button>{" "}
            {getValue()}
          </>
        ),
      }),
      columnHelper.accessor("ref.channel_id", {
        header: "Channel ID",
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
    const subchannels = subchannelMap[row.original.ref.channel_id];
    return ( <TableChannelz data={subchannels} columns={columns} />);
  };

  return (
    <>
      <ConnectionError error={error} setError={setError} />
      <TableChannelz
        data={channels}
        columns={columns}
        renderSubComponent={renderSubchannels}
      />
    </>
  );
};

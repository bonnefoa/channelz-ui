import type { SubchannelResponse } from "../types/SubchannelTypes";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { NumberCellFormatter } from "../components/CellNumber";
import { DateCellFormatter } from "../components/FormattedTime";
import { ChannelStateCellFormatter } from "../components/FormattedState";
import { TableChannelz } from "../components/TableChannelz";
import * as React from "react";
import type { SubchannelId } from "../types/ChannelTypes";
import { getBackendData } from "../utils/utils";

type SubchannelProps = {
  host: string;
  lastClick: number;
  setError: (e: string) => void;
  subchannelIds: SubchannelId[];
};

export const SubchannelList = ({
  host,
  lastClick,
  setError,
  subchannelIds,
}: SubchannelProps) => {
  const columnHelper = createColumnHelper<SubchannelResponse>();
  const [subchannels, setSubchannels] = React.useState<SubchannelResponse[]>(
    []
  );

  const callColumns: ColumnDef<SubchannelResponse, any> = columnHelper.group({
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

  const stateColumn: ColumnDef<SubchannelResponse, any> = columnHelper.group({
    header: "State",
    columns: [
      columnHelper.accessor("data.state.state", {
        cell: ChannelStateCellFormatter,
        header: "Channel State",
      }),
    ],
  });

  const subchannelColumns: ColumnDef<SubchannelResponse, any> =
    columnHelper.group({
      header: "Subchannel",
      columns: [
        columnHelper.accessor("ref.subchannel_id", {
          header: "Subchannel ID",
        }),
      ],
    });

  const columns: ColumnDef<SubchannelResponse, any>[] = [
    subchannelColumns,
    stateColumn,
    callColumns,
  ];

  React.useEffect(() => {
    const parameters = new URLSearchParams({
      host: host,
      subchannelIds: subchannelIds.map((a) => a.subchannel_id).join(","),
    });
    getBackendData<SubchannelResponse>(
      "subchannels",
      parameters,
      setError,
      setSubchannels
    );
  }, [host, lastClick]);
  return <TableChannelz data={subchannels} columns={columns} />;
};

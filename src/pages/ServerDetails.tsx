import {
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import { ConnectionError } from "../components/ConnectionError";
import { TableChannelz } from "../components/TableChannelz";
import * as React from "react";
import type { SocketResponse } from "../types/SocketTypes";
import { DateCellFormatter } from "../components/FormattedTime";
import { getBackendData } from "../utils/utils";

type ServerDetailsProps = {
  host: string;
  serverId: number;
  lastClick: number;
};

export const ServerDetails: React.FunctionComponent<ServerDetailsProps> = ({
  host,
  serverId,
  lastClick,
}) => {
  const [serverDetails, setServerDetails] = React.useState<SocketResponse[]>(
    []
  );
  const [error, setError] = React.useState("");
  const columnHelper = createColumnHelper<SocketResponse>();
  const streamColumns: ColumnDef<SocketResponse, any> = columnHelper.group({
    header: "Streams",
    columns: [
      columnHelper.accessor("data.streams_started", {
        header: "Started",
      }),
      columnHelper.accessor("data.streams_succeeded", {
        header: "Succeeded",
      }),
      columnHelper.accessor("data.streams_failed", {
        header: "Failed",
      }),
      columnHelper.accessor("data.last_local_stream_created_timestamp", {
        header: "Last Local Stream Started (UTC)",
        cell: DateCellFormatter,
      }),
      columnHelper.accessor("data.last_remote_stream_created_timestamp", {
        header: "Last Remote Stream Started (UTC)",
        cell: DateCellFormatter,
      }),
    ],
  });

  const columns: ColumnDef<SocketResponse, any>[] = [
    columnHelper.accessor("ref.socket_id", {
      header: "Socket Id",
    }),
    columnHelper.accessor("ref.name", {
      header: "Local->Remote",
    }),
    streamColumns,
  ];

  React.useEffect(() => {
    const parameters = new URLSearchParams({
      host: host,
      serverId: serverId.toString(),
    });
    getBackendData<SocketResponse>(
      "serverSockets",
      parameters,
      setError,
      setServerDetails
    );
  }, [host, serverId, lastClick]);

  //const table = useReactTable<SocketResponse>({
    //data: serverDetails,
    //columns,
    //getCoreRowModel: getCoreRowModel(),
  //});

  return (
    <>
      <ConnectionError error={error} setError={setError} />
      <TableChannelz data={serverDetails} columns={columns} />;
    </>
  );
};

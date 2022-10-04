import {
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";

import { TableChannelz } from "../components/TableChannelz";
import { ConnectionError } from "../components/ConnectionError";
import { HostInput } from "../components/HostInput";
import { DateCellFormatter } from "../components/FormattedTime";
import type { ServerResponse } from "../types/ServerTypes";
import * as React from "react";
import { getBackendData } from "../utils/utils";
import { NumberCellFormatter } from "../components/CellNumber";

export const Servers: React.FunctionComponent = () => {
  const [host, setHost] = React.useState("");
  const [lastClick, setLastClick] = React.useState(0);

  return (
    <div>
      <HostInput
      currentHost={host}
        setHost={(value) => {
          setHost(value);
          setLastClick(Date.now());
        }}
      />
      <ServerList host={host} lastClick={lastClick} />
    </div>
  );
};

type ServerListProps = {
  host: string;
  lastClick: number;
};

export const ServerList: React.FunctionComponent<ServerListProps> = ({
  host,
  lastClick,
}) => {
  const columnHelper = createColumnHelper<ServerResponse>();
  const [servers, setServers] = React.useState<ServerResponse[]>([]);
  const [error, setError] = React.useState("");

  const socketColumn: ColumnDef<ServerResponse, any> = columnHelper.group({
    header: "Sockets",
    columns: [
      columnHelper.accessor(
        (s) => s.listen_socket.map((s) => `${s.socket_id}: ${s.name}`),
        { header: "Listening Sockets" }
      ),
    ],
  });

  const callColumns: ColumnDef<ServerResponse, any> = columnHelper.group({
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
      columnHelper.accessor((s) => s.data.calls_failed || "0", {
        header: "Calls Failed",
        cell: NumberCellFormatter,
      }),
      columnHelper.accessor("data.last_call_started_timestamp", {
        cell: DateCellFormatter,
        header: "Last Call Started",
      }),
    ],
  });

  const serverColumns: ColumnDef<ServerResponse, any> = columnHelper.group({
    header: "Server",
    columns: [
      columnHelper.accessor("ref.server_id", {
        header: "Server Id",
      }),
    ],
  });

  const columns: ColumnDef<ServerResponse, any>[] = [
    serverColumns,
    callColumns,
    socketColumn,
  ];

  React.useEffect(() => {
    const parameters = new URLSearchParams({
      host: host,
    });
    getBackendData<ServerResponse>(
      "servers",
      parameters,
      setError,
      setServers
    );
  }, [host, lastClick]);

  return (
    <>
      <ConnectionError error={error} setError={setError}/>
      <TableChannelz data={servers} columns={columns} />
    </>
  );
};

import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { DateCellFormatter } from "../components/FormattedTime";
import { TableChannelz } from "../components/TableChannelz";
import type { Event } from "../types/CommonTypes";

type EventProps = {
  events: Event[];
};

export const EventList = ({
  events,
}: EventProps) => {
  const columnHelper = createColumnHelper<Event>();

  const columns: ColumnDef<Event, any>[] = [
      columnHelper.accessor("severity", {
          header: "Severity",
      }),
      columnHelper.accessor("description", {
          header: "Description",
      }),
      columnHelper.accessor("timestamp", {
          cell: DateCellFormatter,
          header: "Timestamp",
      }),
  ];

  return <TableChannelz data={events} columns={columns} />;
};

import Table from "react-bootstrap/Table";
import React, { Fragment } from "react";
import { RowData } from "@tanstack/table-core";
import * as _tanstack_table_core from "@tanstack/table-core";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  SortingState,
  Row,
} from "@tanstack/react-table";

interface TableChannelzProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  variant?: string;
  initialSortingState?: SortingState;
}

export const TableChannelz = <TData extends RowData>({
  data,
  columns,
  renderSubComponent,
  variant,
  initialSortingState,
}: TableChannelzProps<TData>) => {
  const [sorting, setSorting] = React.useState<SortingState>(initialSortingState || []);

  const table = useReactTable<TData>({
    data: data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <Table bordered hover variant={variant}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder ? null : (
                  <>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{ asc: " 🔼", desc: " 🔽" }[
                      header.column.getIsSorted() as string
                    ] ?? null}
                  </>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Fragment key={row.id}>
              <tr
                onClick={() => {
                  row.toggleExpanded();
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
              {row.getIsExpanded() && (
                <tr className="expanded-row">
                  <td colSpan={row.getVisibleCells().length}>
                    {renderSubComponent ? renderSubComponent({ row }) : <></>}
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

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
  Row,
} from "@tanstack/react-table";

interface TableChannelzProps<TData extends RowData> {
  //table: _tanstack_table_core.Table<TData>;

  data: TData[]
  columns: ColumnDef<TData>[]
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
}

export const TableChannelz = <TData extends RowData>({
  data,
  columns,
  renderSubComponent,
}: TableChannelzProps<TData>) => {

    const table = useReactTable<TData>({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

  return (
    <Table striped bordered hover>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
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
              <tr>
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
                <tr>
                  <td colSpan={row.getVisibleCells().length}>
                    {renderSubComponent ? renderSubComponent({ row }): <></>}
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

import Table from "react-bootstrap/Table";
import { RowData } from "@tanstack/table-core";
import { flexRender } from "@tanstack/react-table";
import * as _tanstack_table_core from "@tanstack/table-core";

interface TableChannelzProps<TData extends RowData> {
  table: _tanstack_table_core.Table<TData>;
}

export const TableChannelz = <TData extends RowData>(
  props: TableChannelzProps<TData>
) => (
  <Table striped bordered hover>
    <thead>
      {props.table.getHeaderGroups().map((headerGroup) => (
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
      {props.table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

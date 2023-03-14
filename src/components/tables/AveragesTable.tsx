import { ColumnDef, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Table } from "../layout"
import { Tbody, Td, Th, Thead, Tr } from "../layout/Table"

interface TeamAverage extends Omit<Player, 'team_id'> {
  players: TeamAverage[];
}

interface Props {
  isLoading: boolean;
  data: TeamAverage[];
}

const AveragesTable = ({ data, isLoading }: Props) => {

  // Setup columns
  const columns = useMemo<ColumnDef<TeamAverage>[]>(
    () => [
      {
        header: "Team Name",
        footer: (props) => props.column.id,
        cell: ({ row, getValue }) => {
          return (
            <div style={{
              display: 'flex'
            }}>
              {row.getCanExpand()
                && <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' },
                  }}
                >
                  {row.getIsExpanded() ? '-' : '+'}
                </button>
              }
              <p>{getValue() as string}</p>
            </div>
          )
        },
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.id,
        enableSorting: false,
      },
      {
        header: "Goals",
        footer: (props) => props.column.id,
        cell: ({ row, getValue }) => {
          return (
            <p>{getValue() as string}</p>
          )
        },
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.properties?.goals,
        enableSorting: false,
      },
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    state: { expanded, sorting },
    onExpandedChange: setExpanded,
    getSubRows: row => row.players,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  })

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <Table
      striped
      hasFirstColumn
      compact
    >
      <Thead>
        <Tr>
          {table.getFlatHeaders().map((header) => {
            const onClickIfSortable = header.column.getCanSort()
              ? header.column.getToggleSortingHandler()
              : undefined;
            return header.isPlaceholder ? null : (
              <Th key={header.id} onClick={onClickIfSortable} sorted={header.column.getIsSorted()}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Th>
            )
          })}
        </Tr>
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              )
              )}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
};

export default AveragesTable;
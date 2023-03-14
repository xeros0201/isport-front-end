import { ColumnDef, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, GroupingState, SortingState, useReactTable } from "@tanstack/react-table";
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
        header: "Team",
        columns: [
          {
            header: "Team Name",
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
                  <div style={{ display: 'flex', justifyContent: 'center'}}>{getValue() as string}</div>
                </div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.id,
            enableSorting: true,
          },
        ]
      },
      {
        header: "Disposals",
        columns: [
          {
            header: "D",
            cell: ({ getValue }) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center'}}>{getValue() as string}</div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.properties?.disposal.d,
            enableSorting: true,
          },
          {
            header: "E",
            cell: ({ getValue }) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center'}}>{getValue() as string}</div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.properties?.disposal.e,
            enableSorting: true,
          },
          {
            header: "IE",
            cell: ({ getValue }) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center'}}>{getValue() as string}</div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.properties?.disposal.ie,
            enableSorting: true,
          },
        ]
      },
      {
        header: "Clearances",
        columns: [
          {
            header: "CLR BU",
            cell: ({ getValue }) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center'}}>{getValue() as string}</div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.properties?.clearances.clr_bu,
            enableSorting: true,
          },
          {
            header: "CLR CSB",
            cell: ({ getValue }) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center'}}>{getValue() as string}</div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.properties?.clearances.clr_csb,
            enableSorting: true,
          },
        ]
      }
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getSubRows: row => row.players,
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    state: { expanded, grouping, sorting },
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
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {

                const onClickIfSortable = header.column.getCanSort()
                  ? header.column.getToggleSortingHandler()
                  : undefined;

                return (
                  <Th key={header.id} onClick={onClickIfSortable} sorted={header.column.getIsSorted()} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div style={{ display: 'flex', justifyContent: 'center'}}>
                        {
                          header.column.getCanGroup()
                            ? flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                            : null
                        }
                      </div>
                    )
                    }
                  </Th>
                )
              })}
            </Tr>
          )
        })}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
};

export default AveragesTable;
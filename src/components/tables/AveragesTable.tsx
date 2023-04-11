import { CellContext, ColumnDef, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, GroupingState, HeaderContext, SortingState, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Icon, Spinner } from "../common";
import { Table } from "../layout"
import { Tbody, Td, Th, Thead, Tr } from "../layout/Table"
import TFooter from "../layout/Table/TFooter";

export interface TeamAverage {
  id: number;
  name: string;
  properties: Record<string, Record<string, { name: string, value: number }>>;
  players: TeamAverage[];
}

interface Props {
  isLoading: boolean;
  data?: TeamAverage[];
  totals?: TeamAverage;
}

const AveragesTable = ({ data, isLoading, totals }: Props) => {
  const propertiesColumn = Object.entries(data?.[0]?.properties ?? {}).map(([key, value]) => {
    return (
      {
        header: key.charAt(0).toUpperCase() + key.slice(1),
        columns: Object.keys(value).map((key2) => (
          {
            footer: () => totals?.properties[key][key2].value,
            header: key2.toUpperCase(),
            cell: ({ getValue }: CellContext<TeamAverage, any>) => <p>{getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row: TeamAverage) => row.properties[key][key2].value,
          })
        )
      }
    )
  })

  // Setup columns
  const columns = useMemo<ColumnDef<TeamAverage>[]>(
    () => [
      {
        header: "Team",
        columns: [
          {
            header: "Team Name",
            footer: () => totals?.name,
            cell: ({ row, getValue }) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    paddingLeft: row.getCanExpand() ? 0 : '2rem'
                  }}
                >
                  {row.getCanExpand()
                    && <button
                      onClick={row.getToggleExpandedHandler()}
                      style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                    >
                      {row.getIsExpanded()
                        ? <Icon name='IoRemoveCircleOutline' />
                        : <Icon name='IoAddCircleOutline' />
                      }
                    </button>
                  }
                  {getValue() as string}
                </div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.name,
          },
        ]
      },
      ...propertiesColumn
    ],
    [propertiesColumn]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    columns,
    data: data ?? [],
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

  if (isLoading) return <Spinner size="large" />
  if (!isLoading && !data?.length) return <p>No Averages found</p>;

  return (
    <Table
      compact
      hasFirstColumn
      striped
    >
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  propertyHeader={header.depth === 2}
                  sorted={header.column.getIsSorted()}
                >
                  {header.isPlaceholder ? null : (
                    header.column.getCanGroup()
                      ? flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                      : null
                  )}
                </Th>
              )
              )}
            </Tr>
          )
        )}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} expanded={row.getIsExpanded()}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          )
        )}
      </Tbody>
      {totals
        && <TFooter>
          {table.getFooterGroups().map((footerGroups) => (
            <Tr key={footerGroups.id}>
              {footerGroups.headers.map((footer) => {
                if (footer.depth === 1) return null
                return (
                  <Td>{flexRender(footer.column.columnDef.footer, footer.getContext())}</Td>
                )
              })}
            </Tr>
          ))}
        </TFooter>
      }
    </Table>
  )
};

export default AveragesTable;

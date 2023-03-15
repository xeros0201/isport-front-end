import { CellContext, ColumnDef, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, GroupingState, HeaderContext, SortingState, useReactTable } from "@tanstack/react-table";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { Icon, Spinner } from "../common";
import { Table } from "../layout"
import { Tbody, Td, Th, Thead, Tr } from "../layout/Table"
import './AveragesTable.scss';

interface TeamAverage extends Omit<Player, 'team_id'> {
  players: TeamAverage[];
}

interface Props {
  isLoading: boolean;
  data: TeamAverage[];
}

const AveragesTable = ({ data, isLoading }: Props) => {
  const propertiesColumn = data && Object.entries(data[0]?.properties ?? {}).map(([key, value]) => {
    return (
      {
        header: key.charAt(0).toUpperCase() + key.slice(1),
        footer: (props: HeaderContext<TeamAverage, unknown>) => props.column.id,
        columns: Object.keys(value).map((key2) => (
          {
            header: key2.toUpperCase(),
            cell: ({ getValue }: CellContext<TeamAverage, any>) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>{getValue() as string}</div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row: TeamAverage) => row.properties[key][key2],
          })
        )
      }
    )
  })
  console.log('propertiesColumn', propertiesColumn);

  // Setup columns
  const columns = useMemo<ColumnDef<TeamAverage>[]>(
    () => [
      {
        header: "Team",
        footer: props => props.column.id,
        columns: [
          {
            header: "Team Name",
            footer: props => props.column.id,
            cell: ({ row, getValue }) => {
              return (
                <div style={{
                  display: 'flex'
                }}>
                  {row.getCanExpand()
                    && <button
                      {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: 'pointer', background: 'none', border: 'none' },
                      }}
                    >
                      {row.getIsExpanded()
                        ? <Icon
                          name='IoRemoveCircleOutline'
                        />
                        : <Icon
                          name='IoAddCircleOutline'
                        />
                      }
                    </button>
                  }
                  <div style={{ display: 'flex', justifyContent: 'center' }}>{getValue() as string}</div>
                </div>
              )
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.id,
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

  if (isLoading) return <Spinner size="large" />
  if (!isLoading && !data.length) return <p>No Averages found</p>;

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
                const isSorted = header.column.getIsSorted();
                const canSort = header.column.getCanSort()

                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}
                        onClick={header.column.getToggleSortingHandler()}
                        className={
                          classNames({
                            'sortCell': canSort
                          })
                        }
                      >
                        {
                          header.column.getCanGroup()
                            ? flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                            : null
                        }
                        {isSorted === 'asc' && <Icon name="IoCaretUp" />}
                        {isSorted === 'desc' && <Icon name="IoCaretDown" />}
                      </div>
                    )}
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
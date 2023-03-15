import { CellContext, ColumnDef, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, GroupingState, HeaderContext, SortingState, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Icon, Spinner } from "../common";
import { Table } from "../layout"
import { Tbody, Td, Th, Thead, Tr } from "../layout/Table"
import TFooter from "../layout/Table/TFooter";

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
        columns: Object.keys(value).map((key2) => (
          {
            footer: (props: HeaderContext<TeamAverage, unknown>) => props.column.id,
            header: key2.toUpperCase(),
            cell: ({ getValue }: CellContext<TeamAverage, any>) => <p>{getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row: TeamAverage) => row.properties[key][key2],
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
            footer: props => props.column.id,
            cell: ({ row, getValue }) => {
              return (
                <div style={{ display: 'flex' }}>
                  {row.getCanExpand()
                    && <button
                      onClick={() => row.getToggleExpandedHandler()}
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
      compact
      hasFirstColumn
      striped
    >
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
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
      {/* <TFooter>
        {table.getFooterGroups().map((footerGroups) => (
          <Tr key={footerGroups.id}>
            {footerGroups.headers.map((footer) => (
              <Td>{footer.id}</Td>
            ))}
          </Tr>
        ))}
      </TFooter> */}
    </Table>
  )
};

export default AveragesTable;

// TODO - better way of building the columns
// TODO - totals
// TODO - fix padding issue with sort
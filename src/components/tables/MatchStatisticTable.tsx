import {
  CellContext,
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  HeaderContext,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Icon, Spinner } from "../common";
import { Table } from "../layout";
import { Tbody, Td, Th, Thead, Tr } from "../layout/Table";
import TFooter from "../layout/Table/TFooter";
import _ from "lodash";

export interface TeamAverage {
  id: number;
  name: string;
  properties: Record<string, Record<string, { name: string; value: number }>>;
  players: TeamAverage[];
}

interface Props {
  isLoading: boolean;
  data?: Result;
  type: "home" | "away";
}

const MatchStatisticTable = ({ data, isLoading, type }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const propertiesColumn = useMemo<ColumnDef<PlayerOnResult>[]>(() => {
    return Object.entries(data?.players[0].values || {}).map(([key, value]) => {
      return {
        header: key,
        columns: Object.entries(value).map(([key2, value2]) => ({
          header: value2.name,
          cell: ({ getValue }: CellContext<TeamAverage, any>) => (
            <p>{getValue() as string}</p>
          ),
          sortingFn: "alphanumeric",
          accessorFn: (row) => {
            const val = (row.values[key][key2] || { value: 0 }).value;

            return key2.startsWith("PER_") ? `${val}%` : val;
          },
          id: key2,
        })),
      };
    });
  }, [data]);

  // Setup columns
  const columns = useMemo<ColumnDef<PlayerOnResult>[]>(
    () => [
      {
        header: "Player",
        columns: [
          {
            header: type.charAt(0).toUpperCase() + type.slice(1),
            cell: ({ row, getValue }) => {
              return <p className="player-name">{getValue() as string}</p>;
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) =>
              `${
                row.player.playerNumber < 10
                  ? `0${row.player.playerNumber}`
                  : row.player.playerNumber
              }. ${row.player.name}`,
          },
        ],
      },
      ...propertiesColumn,
    ],
    [propertiesColumn]
  );

  const totals = useMemo(() => {
    const _totals =
      data?.players.reduce((obj: Record<string, number>, item) => {
        Object.entries(item.values).forEach(([key1, value1]) => {
          Object.entries(value1).forEach(([key2, value2]) => {
            const key = key2;
            obj[key] = (obj[key] || 0) + value2.value;
          });
        });
        return obj;
      }, {}) || {};

    _totals.PER_1 = _.round((_totals.E_1 / _totals.D) * 100, 1);
    _totals.PER_2 = _.round((_totals.E_2 / _totals.K) * 100, 1);
    _totals.PER_3 = _.round((_totals.E_3 / _totals.HB) * 100, 1);

    return _totals;
  }, [data]);

  const table = useReactTable({
    columns,
    data: data?.players ?? [],
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    state: { expanded, grouping, sorting },
  });

  if (isLoading) return <Spinner size="large" />;
  if (!isLoading && !data?.players?.length) return <p>No Statistics found</p>;

  return (
    <Table
      compact
      hasFirstColumn
      striped
      className={`match-statistic-table--${type}`}
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
                {header.isPlaceholder
                  ? null
                  : header.column.getCanGroup()
                  ? flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  : null}
              </Th>
            ))}
          </Tr>
        ))}
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
        ))}
      </Tbody>
      {
        <TFooter>
          {table.getFooterGroups().map((footerGroups) => {
            if (footerGroups.depth === 0) return null;

            return (
              <Tr key={footerGroups.id}>
                {footerGroups.headers.map((header) => {
                  let text = (
                    header.index === 0 ? "Total" : totals[header.id]
                  )?.toString();

                  if (header.id.includes("PER_")) {
                    text += "%";
                  }

                  return <Td>{text}</Td>;
                })}
              </Tr>
            );
          })}
        </TFooter>
      }
    </Table>
  );
};

export default MatchStatisticTable;

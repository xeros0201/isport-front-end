import { Table, Tbody, Td, Th, Thead, Tr } from "../layout/Table";
import { Logo, Spinner } from "../common";
const s3URL = import.meta.env.VITE_S3_URL;
import { statOptions } from "../../data/statistics";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getStats } from "../../api/players";

interface LeaderBoardTableProps {
  property?: string;
  teamId?: number;
  seasonId?: number;
  leagueId?: number;
}

const LeaderboardTable = ({
  property,
  teamId,
  seasonId,
  leagueId,
}: LeaderBoardTableProps) => {
  const {
    error: fetchError,
    isLoading,
    data: _data,
  } = useQuery(
    ["getProperty", { property, teamId, seasonId, leagueId }],
    async (): Promise<PlayersOnAflResults[]> => {
      if (!property || !seasonId) return [];
      let _teamId = teamId;
      if (!teamId) _teamId = undefined;
      const temp = await getStats(seasonId, property, _teamId);
      return temp;
    }
  );

  const statLabel = useMemo(() => {
    const stat = statOptions.find((stat) => stat.alias === property);
    return stat?.name || property;
  }, [property]);

  // Setup columns
  const columns = useMemo<ColumnDef<PlayersOnAflResults>[]>(
    () => [
      {
        header: "#",
        footer: (props) => props.column.id,
        cell: (info) => (
          <p style={{ textAlign: "center" }}>{info.getValue() as string}</p>
        ),
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.playerNumber,
        enableSorting: false,
        size: 100,
      },
      {
        header: "Player",
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.name,
        enableSorting: false,
      },
      {
        header: "Team",
        footer: (props) => props.column.id,
        cell: (info) => {
          const logo = info.row.original.team.logo;
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Logo
                url={logo ? `${s3URL}/images/${logo}` : "/league-logo.png"}
                height={40}
              />
              <p style={{ marginLeft: 10 }}>{info.getValue() as string}</p>
            </div>
          );
        },
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.team.name,
        enableSorting: false,
      },
      {
        header: statLabel || property || "Property",
        footer: (props) => props.column.id,
        cell: (info) => (
          <p style={{ textAlign: "right" }}>{info.getValue() as string}</p>
        ),
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.total,
        enableSorting: false,
      },
    ],
    [property]
  );

  // Setup table
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: _data ? _data : ([] as PlayersOnAflResults[]),
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  // If loading
  if (isLoading) return <Spinner size="large" />;

  // If no data
  if (!isLoading && !_data?.length) return <p>No player found</p>;

  // // If no property select
  // if (!property || property == "") return <p>Select Property</p>;

  return (
    <Table>
      <Thead>
        <Tr>
          {table.getFlatHeaders().map((header) => {
            const onClickIfSortable = header.column.getCanSort()
              ? header.column.getToggleSortingHandler()
              : undefined;
            return header.isPlaceholder ? null : (
              <Th
                key={header.id}
                onClick={onClickIfSortable}
                sorted={header.column.getIsSorted()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default LeaderboardTable;

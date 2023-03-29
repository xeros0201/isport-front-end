import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "../layout/Table";
import { Button, Logo, Spinner } from "../common";
import { DateTime } from "luxon";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Row } from "../layout";
import { MatchStatus } from "../../constants";

interface MatchTableProps {
  data: Match[];
  isLoading?: boolean;
}

const MatchTable = ({ data, isLoading = false }: MatchTableProps) => {
  const navigate = useNavigate();

  // Setup columns
  const columns = useMemo<ColumnDef<Match>[]>(
    () => [
      {
        header: "Home team",
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.homeTeam?.name,
        enableSorting: true,
      },
      {
        header: "Away team",
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.awayTeam?.name,
        enableSorting: true,
      },
      {
        header: "League",
        footer: (props) => props.column.id,
        cell: (info) => {
          const { logo, name } = info.getValue() as League;
          return <Logo url={logo} label={name} height={40} />;
        },
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.season?.league,
        enableSorting: false,
      },
      {
        header: "Season",
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.season?.name,
        enableSorting: true,
      },
      {
        header: "Date Created",
        footer: (props) => props.column.id,
        cell: ({ getValue }) => {
          const dateTime = DateTime.fromISO(
            getValue() as string
          ).toLocaleString(DateTime.DATETIME_SHORT);
          return <p>{dateTime}</p>;
        },
        sortingFn: "datetime",
        accessorFn: (row) => row.date,
        enableSorting: true,
      },
      {
        header: "Match Report",
        footer: (props) => props.column.id,
        cell: (info) =>
          info.getValue<string>().split(",")[0] == "PUBLISHED" && (
            <Button
              label="Match Report"
              type="outlined"
              size="small"
              onClick={() =>
                navigate(
                  `/match-report?id=${info.getValue<string>().split(",")[1]}`
                )
              }
            />
          ),
        sortingFn: "text",
        accessorFn: (row) => `${row.status},${row.id}`,
        enableSorting: false,
      },
      {
        header: "Action",
        footer: (props) => props.column.id,
        cell: (info) => {
          console.log(info);
          const isDraft = info.getValue() === MatchStatus.DRAFT;
          return (
            <Row alignItems="center" noFlex justifyContent={"flex-start"}>
              <Button
                label={isDraft ? "Edit" : "View"}
                type="secondary"
                icon={isDraft ? "IoPencilOutline" : "IoEyeOutline"}
                size="small"
                onClick={() =>
                  navigate(`/admin/matches/edit?id=${info.row.original.id}`)
                }
              />
              {isDraft && (
                <Button
                  label="Delete"
                  type="danger"
                  icon="IoTrash"
                  size="small"
                  onClick={() =>
                    navigate(
                      `/admin/matches/id=${
                        info.getValue<string>().split(",")[1]
                      }`
                    )
                  }
                />
              )}
            </Row>
          );
        },
        sortingFn: "text",
        accessorFn: (row) => row.status,
        enableSorting: false,
        enableHiding: false,
      },
    ],
    []
  );

  // Setup table
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
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
  if (!isLoading && !data.length) return <p>No matches found</p>;

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

export default MatchTable;

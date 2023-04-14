import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/layout/Table";
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
const s3URL = import.meta.env.VITE_S3_URL;

interface PlayerTableProps {
  data: Player[];
  isLoading?: boolean;
}

const PlayerTable = ({ data, isLoading = false }: PlayerTableProps) => {
  const navigate = useNavigate();

  // Setup columns
  const columns = useMemo<ColumnDef<Player>[]>(
    () => [
      {
        header: "#",
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.id,
        enableSorting: true,
      },
      {
        header: "Player Number",
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.playerNumber,
        enableSorting: true,
      },
      {
        header: "Player Name",
        footer: (props) => props.column.id,
        cell: (info) => <p>{info.getValue() as string}</p>,
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.name,
        enableSorting: true,
      },
      {
        header: "Team",
        footer: (props) => props.column.id,
        cell: (info) => {
          const teamName = info?.row?.original.team?.name;
          const imgId = info?.row?.original.team?.logo;
          const imgUrl = imgId ? `${s3URL}/image/${imgId}` : "/league-logo.png";
          return (
            <Row removeSpacing alignItems={"center"}>
              <Logo isSquare height={42} url={imgUrl} />
              <span>{teamName as string}</span>
            </Row>
          );
        },
        sortingFn: "alphanumeric",
        accessorFn: (row) => row?.team?.name,
        enableSorting: true,
      },
      {
        header: "League",
        footer: (props) => props.column.id,
        cell: (info) => {
          const leagueName = info?.row?.original.team?.season?.league?.name;
          const imgId = info?.row?.original.team?.season?.league?.logo;
          const imgUrl = imgId ? `${s3URL}/image/${imgId}` : "/league-logo.png";
          return (
            <Row removeSpacing alignItems={"center"}>
              <Logo isSquare height={42} url={imgUrl} />
              <span>{leagueName as string}</span>
            </Row>
          );
        },
        sortingFn: "alphanumeric",
        accessorFn: (row) => row?.team?.season?.league?.name,
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
        accessorFn: (row) => row.createdDate,
        enableSorting: true,
      },
      {
        header: "Action",
        footer: (props) => props.column.id,
        cell: (info) => (
          <Button
            label="Edit"
            type="secondary"
            icon="IoPencilOutline"
            size="small"
            onClick={() =>
              navigate(`/admin/players/edit?id=${info.getValue()}`)
            }
          />
        ),
        sortingFn: "text",
        accessorFn: (row) => row.id,
        enableSorting: false,
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
  if (!isLoading && !data.length) return <p>No players found</p>;

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

export default PlayerTable;

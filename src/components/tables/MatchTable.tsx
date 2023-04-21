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
import { useEffect, useMemo, useState } from "react";
import { Row } from "../layout";
import { MatchStatus } from "../../types/enums";
import { deleteMatch } from "../../api/matches";
import { DangerModal } from "../modals";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const s3URL = import.meta.env.VITE_S3_URL;

interface MatchTableProps {
  data: Match[];
  isLoading?: boolean;
}

const MatchTable = ({ data, isLoading = false }: MatchTableProps) => {
  const navigate = useNavigate();
  const [_data, setData] = useState(data);
  const [modalData, setModalData] = useState<{ id?: number; open: boolean }>({
    open: false,
  });

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleDeleteMatch = async (id: number) => {
    try {
      const rs = await deleteMatch(id);
      const __data = _data.filter((match) => match.id !== id);
      setData(__data);
    } catch (error) {
      // console.error(error);
    }
  };

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
          const imgUrl = logo ? `${s3URL}/images/${logo}` : "/league-logo.png";
          return (
            <Row removeSpacing alignItems={"center"}>
              <Logo isSquare height={42} url={imgUrl} />
              <span>{name as string}</span>
            </Row>
          );
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
        header: "Round",
        footer: (props) => props.column.id,
        cell: (info) => (
          <p style={{ textAlign: "center" }}>{info.getValue() as string}</p>
        ),
        sortingFn: "alphanumeric",
        accessorFn: (row) => row.round,
        enableSorting: true,
      },
      {
        header: "Date Created",
        footer: (props) => props.column.id,
        cell: ({ getValue }) => {
          const dateTime = dayjs(getValue() as string)
            .utc()
            .format("DD/MM/YYYY, hh:mm A");

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
          info.getValue<string>().split(",")[0] == MatchStatus.PUBLISHED && (
            <Button
              marginAuto
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
          const isDraft = info.getValue() === MatchStatus.DRAFT;
          return (
            <Row alignItems="center" noFlex justifyContent={"center"}>
              <Button
                marginAuto
                label={isDraft ? "Edit" : "View"}
                type="secondary"
                icon={isDraft ? "IoPencilOutline" : "IoEyeOutline"}
                size="small"
                onClick={() =>
                  navigate(`/admin/matches/edit?id=${info.row.original.id}`)
                }
              />
              <Button
                marginAuto
                label="Delete"
                type="danger"
                icon="IoTrash"
                size="small"
                onClick={() =>
                  setModalData({ id: info.row.original.id, open: true })
                }
              />
            </Row>
          );
        },
        sortingFn: "text",
        accessorFn: (row) => row.status,
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [_data]
  );

  // Setup table
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: _data,
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
  if (!isLoading && !_data.length) return <p>No matches found</p>;

  return (
    <>
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
      <DangerModal
        isOpen={modalData.open}
        onClose={() => setModalData({ open: false })}
        message="Do you really want to delete this match?"
        buttonLabel="Delete Match"
        buttonOnClick={() => {
          setModalData({ open: false });
          if (modalData.id) handleDeleteMatch(modalData.id);
        }}
      />
    </>
  );
};

export default MatchTable;

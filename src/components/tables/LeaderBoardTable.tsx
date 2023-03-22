import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "../layout/Table";
import { Button, Logo, Spinner } from "../common";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface LeaderBoardTableProps {
    data: PlayersOnAflResults[];
    stat: AflResultProperties;
    isLoading?: boolean;
}

const LeaderboardTable = ({ data, stat, isLoading = false }: LeaderBoardTableProps) => {
    const [statCol, setStatCol] = useState("");

    // Setup columns
    const columns = useMemo<ColumnDef<PlayersOnAflResults>[]>(
        () => [
          {
            header: "#",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.player.playerNumber,
            enableSorting: false,
          },
          {
            header: "Player",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.player.name,
            enableSorting: false,
          },
          {
            header: stat.name,
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.value,
            enableSorting: false,
          }
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
    })

    // If loading
    if (isLoading) return <Spinner size="large" />

    // If no data
    if (!isLoading && !data.length) return <p>No teams found</p>;

    return (
        <Table >
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
    )
};

export default LeaderboardTable;
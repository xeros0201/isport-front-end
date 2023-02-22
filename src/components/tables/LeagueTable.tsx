import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/layout/Table";
import { Button, Spinner } from "../common";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface LeagueTableProps {
    data: League[];
    isLoading?: boolean;
}

const LeagueTable = ({ data, isLoading = false }: LeagueTableProps) => {
    const navigate = useNavigate();

    // Setup columns
    const columns = useMemo<ColumnDef<League>[]>(
        () => [
          {
            header: "League Name",
            footer: (props) => props.column.id,
            cell: (info) => info.getValue(),
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.name,
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
                    onClick={() => navigate(`/admin/leagues/edit?id=${info.getValue()}`)}
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
    })

    // If loading
    if (isLoading) return <Spinner size="large" />

    // If no data
    if (!isLoading && !data.length) return <p>No leagues found</p>;

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

export default LeagueTable;
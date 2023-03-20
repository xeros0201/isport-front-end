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

interface TeamTableProps {
    data: Team[];
    isLoading?: boolean;
}

const TeamTable = ({ data, isLoading = false }: TeamTableProps) => {
    const navigate = useNavigate();

    // Setup columns
    const columns = useMemo<ColumnDef<Team>[]>(
        () => [
          {
            header: "Team Name",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.name,
            enableSorting: true,
          },
          {
            header: "Team Logo",
            footer: (props) => props.column.id,
            cell: (info) => (
                <Logo url="/league-logo.png" height={40} />
            ),
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.logo,
            enableSorting: false,
          },
          {
            header: "League",
            footer: (props) => props.column.id,
            cell: (info) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Logo url="/league-logo.png" height={40} />
                    <p style={{ marginLeft: 10 }}>{info.getValue() as string}</p>
                </div>
            ),
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.season.league.name,
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
                    onClick={() => navigate(`/admin/teams/edit?id=${info.getValue()}`)}
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

export default TeamTable;
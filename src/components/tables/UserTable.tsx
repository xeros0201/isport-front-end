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
import { DateTime } from "luxon";

interface UserTableProps {
    data: User[];
    isLoading?: boolean;
}

const UserTable = ({ data, isLoading = false }: UserTableProps) => {
    const navigate = useNavigate();

    // Setup columns
    const columns = useMemo<ColumnDef<User>[]>(
        () => [
          {
            header: "Email",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "text",
            accessorFn: (row) => row.email,
            enableSorting: true,
          },
          {
            header: "First Name",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "text",
            accessorFn: (row) => row.firstName,
            enableSorting: true,
          },
          {
            header: "Last Name",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "text",
            accessorFn: (row) => row.lastName,
            enableSorting: true,
          },
          {
            header: "Status",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() ? "Active" : "Deactive"}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.active,
            enableSorting: true
          },
          {
            header: "Date Created",
            footer: (props) => props.column.id,
            cell: ({ getValue }) => {
                const dateTime = DateTime
                    .fromISO(getValue() as string)
                    .toLocaleString(DateTime.DATETIME_SHORT);
                return <p>{dateTime}</p>
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
                    onClick={() => navigate(`/admin/users/edit?id=${info.getValue()}`)}
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
    if (!isLoading && !data.length) return <p>No users found</p>;

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

export default UserTable;
import { Table, Tbody, Td, Th, Thead, Tr } from "../layout/Table";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

interface TeamLeaderTableProps {
    property?: string;
    columnsDisable?: string[];
    data: ReportProps[]
}

const TeamLeaderTable = ({ property, data }: TeamLeaderTableProps) => {
    const _data = useMemo(() => {
        if (!data) return [];
        return data;
    }, [data]);
    // Setup columns
    const columns = useMemo<ColumnDef<ReportProps>[]>(
        () => [
          {
            header: "#",
            footer: (props) => props.column.id,
            cell: (info) => {
                const value = info.getValue() as string;
                const formatValue = value.toString().length == 1 ? `0${value}` : value;
                return <p style={{textAlign: "center"}}>{formatValue}</p>
            },
            sortingFn: "alphanumeric",
            accessorFn: (row) => (row.player.playerNumber || row.player.id),
            enableSorting: true,
          },
          {
            header: "Player",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.player.name,
            enableSorting: true,
          },
          {
            header: property || "Property",
            footer: (props) => props.column.id,
            cell: (info) => <p style={{textAlign: "right"}}>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.value,
            enableSorting: true,
          }
        ],
        []
      );

    // Setup table
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: _data ? _data : [] as ReportProps[],
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })

    return (
        <Table noMargin compact>
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

export default TeamLeaderTable;
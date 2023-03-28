import { Table, Tbody, Td, Th, Thead, Tr } from "../layout/Table";
import { Spinner } from "../common";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
  } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface MatchReportTableProps {
    parentName: string;
    data: ReportOnMatches[];
    isLoading?: boolean;
}

const MatchReportTable = ({ parentName, data, isLoading = false }: MatchReportTableProps) => {
    // const [data, setData] = useState([] as ReportOnMatches[])

    //Filter aflResultProps by parentId
    // useMemo(() => {
    //     const temp = _data.filter(item => item.aflResultProperties.parentId === parentId);
    //     setData(temp);
    // }, [parentId]);

    // Setup columns
    const columns = useMemo<ColumnDef<ReportOnMatches>[]>(
        () => [
          {
            header: parentName,
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => {
                // debugger
                const a = row.resultProperty.name;
                return a;
            },
            enableSorting: false,
          },
          {
            header: "Home",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.value.home,//Data is array of numbers. This will be split into 3 columns "Home", "Away" and "Diff."
            enableSorting: false,
          },
          {
            header: "Away",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.value.away,//Data is array of numbers. This will be split into 3 columns "Home", "Away" and "Diff."
            enableSorting: false,
          },
          {
            header: "Diff",
            footer: (props) => props.column.id,
            cell: (info) => <p>{info.getValue() as string}</p>,
            sortingFn: "alphanumeric",
            accessorFn: (row) => row.value.diff,//Data is array of numbers. This will be split into 3 columns "Home", "Away" and "Diff."
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
    if (!isLoading && !data) return <p>No match report of "{}" found</p>;

    return (
        <Table compact striped>
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

export default MatchReportTable;
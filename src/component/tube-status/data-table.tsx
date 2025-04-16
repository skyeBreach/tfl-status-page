"use client"

import type { TLine } from "@/src/types/line";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/component/shadcn/table";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/src/component/shadcn/drawer";
import { useState } from "react";

import { Button } from "@/src/component/shadcn/button";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const LineStatusTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) => {
    const [open, setOpen] = useState(false);
    const [line, setLine] = useState<TLine>(data[0] as TLine)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const openDrawer = (data: TLine | undefined) => {
        if (!data) return;
        setLine(data)
        setOpen(true)
    }

    return (
        <div>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Tube Line: {line.name}</DrawerTitle>
                        <DrawerDescription>
                            <h3>Updated On: {line.modified?.toWellFormed()}</h3>
                            <h3>Distruptions:</h3>
                            <pre>{JSON.stringify(line.disruptions, null, 4)}</pre>

                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClickCapture={() => openDrawer(data[index] as TLine)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
}

export default LineStatusTable;

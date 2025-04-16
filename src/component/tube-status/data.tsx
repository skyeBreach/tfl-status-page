"use client"

import type { TLine, TSeverityCode, TLineStatus } from '@/src/types/line';
import { FetchSeverityCodes } from '@/src/services/line';
import { ColumnDef } from '@tanstack/react-table';

const severityCodes = await FetchSeverityCodes();

export const columns: ColumnDef<TLine>[] = [
    {
        accessorFn: (data) => {
            if (!data.lineStatuses || data.lineStatuses?.length === 0) return severityCodes[severityCodes.length - 1]?.description;

            const minSeverity = Math.min(...data.lineStatuses.map((status: TLineStatus): number | 999 => {
                if (status.statusSeverity === 0) return 999;
                return status.statusSeverity || 18;
            }));

            return severityCodes[minSeverity]?.description;
        },
        "header": "Status",
    },
    {
        "accessorKey": "name",
        "header": "Line",
    },
    {
        "header": "Service Type(s)",
        "accessorFn": (data: TLine): string | undefined => {
            if (!data.serviceTypes || data.serviceTypes.length === 0) return undefined;
            return data.serviceTypes.reduce(
                (acc: string[], cur): string[] => {
                    cur.name && acc.push(cur.name);
                    return acc;
                }, []).join(", ")
        },
    },
    {
        "header": "Distruptions",
        "accessorFn": (data) => data.disruptions?.length
    },
    {
        "header": "Updated",
        "accessorFn": (data) => new Date(data.modified?.toString() || 0).toLocaleString()
    }
]

import { paths, components } from "@/src/types/line_schema"

export enum ServiceTypeFilter {
    REGULAR = "Regular",
    NIGHT = "Night",
    BOTH = "Regular;Night",
};

export type TDistruption = components["schemas"]["Tfl-14"];
export type TDistruptionCategory = components["schemas"]["Tfl-14"];
export type TLineStatus = components["schemas"]["Tfl-16"]
export type TLine = components["schemas"]["Tfl-19"];
export type TSeverityCode = components["schemas"]["Tfl-2"];

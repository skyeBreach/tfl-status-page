import type { TLine, TSeverityCode, TDistruptionCategory } from "@/src/types/line";
import { ServiceTypeFilter } from "@/src/types/line";
import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'https://api.tfl.gov.uk/Line',
    timeout: 1000,
    headers: {
        app_key: process.env.TFL_APP_KEY,
    },
});

export const FetchLines = async (serviceType?: ServiceTypeFilter): Promise<TLine[]> => {
    const res = await AxiosInstance({
        url: `/Mode/tube/Route`,
        method: 'get',
        params: {
            serviceTypes: serviceType || ServiceTypeFilter.REGULAR,
        },
    });

    return res.data;
};

export const FetchSeverityCodes = async (): Promise<TSeverityCode[]> => {
    const res = await AxiosInstance({
        url: `/Meta/Severity`,
        method: 'get',
    });

    return res.data.filter((code: TSeverityCode) => {
        if (code.modeName !== "tube") return false;
        return true;
    });
};

export const FetchDistruptionCategories = async (): Promise<TDistruptionCategory[]> => {
    const res = await AxiosInstance({
        url: `/Meta/DisruptionCategories`,
        method: 'get',
    })

    return res.data;
};

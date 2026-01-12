export type AnalyticsQuery = {
    symbol: string;
    interval: string;
    startTime: string;
    endTime: string;
}

export type Analytics = {
    openPrices: number;
    closePrices: number;
    change: number;
    changePercentage: number;
}

export type AnalyticsResponse = {
    message: string;
    data: Analytics & {
        dateOpen: string;
        dateClose: string;
    } | null;
    meta: {
        symbol: string;
        interval: string;
        klines: number;
    } | null;
}
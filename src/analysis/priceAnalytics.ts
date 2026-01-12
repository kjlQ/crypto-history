export const analyzeKlines = (klines: number[][]) => {

    if(klines.length === 0) {
       return null;
    }

    const openPrices = parseFloat(String(klines[0][1]));
    const closePrices = parseFloat(String(klines[klines.length - 1][4]));

    const change = parseFloat(String(closePrices - openPrices));
    const changePercentage = parseFloat(String((change / openPrices) * 100));

    return {
        openPrices,
        closePrices,
        change,
        changePercentage
    };
};
export const analyzeKlines = (klines) => {

    if(klines.length === 0) {
       return null;
    }

    const openPrices = parseFloat(klines[0][1]);
    const closePrices = parseFloat(klines[klines.length - 1][4]);

    const change = parseFloat((closePrices - openPrices));
    const changePercentage = parseFloat(((change / openPrices) * 100));

    return {
        openPrices,
        closePrices,
        change,
        changePercentage
    };
};
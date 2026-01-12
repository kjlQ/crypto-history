export const analyzeKlines = (klines) => {

    if(klines.length === 0) {
       return null;
    }

    const openPrices = klines[0][1];
    const closePrices = klines[klines.length - 1][4];

    console.log(openPrices, closePrices);

    return klines;
};
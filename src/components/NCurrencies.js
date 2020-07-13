//WARNING -- Also modify server.js
const currencies = [
    {code: 'AUD', label: 'A$', value: 1.6247, decimals: true},
    {code: 'CAD', label: 'C$', value: 1.5336, decimals: true},
    {code: 'CZK', label: 'Kč', value: 26.691, decimals: true},
    {code: 'DKK', label: 'Kr.', value: 7.4483, decimals: true},
    {code: 'EUR', label: '€', value: 1, decimals: true},
    {code: 'HKD', label: 'HK$', value: 8.7396, decimals: true},
    {code: 'HUF', label: 'Ft', value: 353.7, decimals: false},
    {code: 'ILS', label: '₪', value: 3.9006, decimals: true},
    {code: 'JPY', label: '¥', value: 120.48, decimals: false},
    {code: 'MXN', label: 'Mex$', value: 25.6953, decimals: true},
    {code: 'NZD', label: 'NZ$', value: 1.7189, decimals: true},
    {code: 'NOK', label: 'kr', value: 10.7163, decimals: true},
    {code: 'PHP', label: '₱', value: 55.794, decimals: true},
    {code: 'PLN', label: 'zł', value: 4.4743, decimals: true},
    {code: 'GBP', label: '£', value: 0.8957, decimals: true},
    {code: 'RUB', label: '₽', value: 80.2104, decimals: true},
    {code: 'SGD', label: 'S$', value: 1.5703, decimals: true},
    {code: 'SEK', label: 'kr', value: 10.398, decimals: true},
    {code: 'CHF', label: 'CHf', value: 1.0625, decimals: true},
    {code: 'THB', label: '฿', value: 35.316, decimals: true},
    {code: 'USD', label: '$', value: 1.1276, decimals: true}
];

const getCurrencyLabel = (code) => {
    return currencies.find(c => c.code===code).label;
}

const getCurrencyValue = (code) => {
    return currencies.find(c => c.code===code).value;
}

const hasCurrencyDecimals = (code) => {
    return currencies.find(c => c.code===code).decimals;
}

export { currencies, getCurrencyLabel, getCurrencyValue, hasCurrencyDecimals };
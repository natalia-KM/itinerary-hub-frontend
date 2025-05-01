export const currencyMap: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: '$',
    CAD: '$',
    CHF: 'CHF',
    CNY: '¥',
    INR: '₹',
    NZD: '$',
}

export const getCurrencySymbol = (code: string): string => {
    return currencyMap[code]
}

export const prettifyPrice = (currency?: string | null, price?: number) => {
    if(!currency || !price) return undefined

    return `${getCurrencySymbol(currency)} ${price}`
}

export const getCurrencySymbol = (code: string): string => {
    return (0).toLocaleString('en', {
        style: 'currency',
        currency: code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).replace(/\d/g, '').trim()
}

export const prettifyPrice = (currency?: string | null, price?: number) => {
    if(!currency || !price) return undefined

    return `${getCurrencySymbol(currency)} ${price}`
}

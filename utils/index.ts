
export function truncateText(text: string | undefined, maxLength: number = 100): string {
    if (!text) return "Loading..."; // Handle undefined or null values gracefully
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function formatCurrency(
    amount: number | undefined | null, 
    currency: string = "USD", 
    locale: string = "en-US"
): string {
    if (amount === undefined || amount === null || isNaN(amount)) return "N/A"; // Handle invalid inputs
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}


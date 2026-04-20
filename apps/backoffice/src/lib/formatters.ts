export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

export function formatCurrencyWithCents(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

export function formatCurrencyCompact(amount: number): string {
  return `$${(amount / 1000).toFixed(0)}k`;
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString();
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

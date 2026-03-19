export function formatCurrency(value: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2,
	}).format(value);
}

export function formatPercentage(value: number) {
	const sign = value > 0 ? '+' : '';
	return `${sign}${value.toFixed(2)}%`;
}

export type AssetType = 'stock' | 'etf' | 'crypto';

export interface Asset {
	id: string;
	symbol: string;
	name: string;
	price: number;
	changePercent: number;
	description: string;
	type: AssetType;
}

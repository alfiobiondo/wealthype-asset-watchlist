import type { Asset } from '../types/asset';

export const assets: Asset[] = [
	{
		id: 'aapl',
		symbol: 'AAPL',
		name: 'Apple Inc.',
		price: 213.65,
		changePercent: 1.24,
		description: 'Apple designs consumer electronics, software, and services.',
		type: 'stock',
	},
	{
		id: 'msft',
		symbol: 'MSFT',
		name: 'Microsoft Corp.',
		price: 398.12,
		changePercent: -0.56,
		description:
			'Microsoft develops software, cloud services, and hardware products.',
		type: 'stock',
	},
	{
		id: 'spy',
		symbol: 'SPY',
		name: 'SPDR S&P 500 ETF',
		price: 512.33,
		changePercent: 0.32,
		description: 'ETF tracking the S&P 500 index.',
		type: 'etf',
	},
	{
		id: 'qqq',
		symbol: 'QQQ',
		name: 'Invesco QQQ Trust',
		price: 438.91,
		changePercent: -1.12,
		description: 'ETF tracking the Nasdaq-100 index.',
		type: 'etf',
	},
	{
		id: 'btc',
		symbol: 'BTC',
		name: 'Bitcoin',
		price: 67250.44,
		changePercent: 2.87,
		description: 'Bitcoin is a decentralized digital currency.',
		type: 'crypto',
	},
	{
		id: 'eth',
		symbol: 'ETH',
		name: 'Ethereum',
		price: 3540.18,
		changePercent: -0.91,
		description:
			'Ethereum is a blockchain platform with smart contract support.',
		type: 'crypto',
	},
];

import { PrismaClient, AssetType } from '@prisma/client';

const prisma = new PrismaClient();

const assets = [
	{
		id: 'aapl',
		symbol: 'AAPL',
		name: 'Apple Inc.',
		price: '213.65',
		changePercent: '1.24',
		description: 'Apple designs consumer electronics, software, and services.',
		type: AssetType.STOCK,
	},
	{
		id: 'msft',
		symbol: 'MSFT',
		name: 'Microsoft Corp.',
		price: '398.12',
		changePercent: '-0.56',
		description:
			'Microsoft develops software, cloud services, and hardware products.',
		type: AssetType.STOCK,
	},
	{
		id: 'spy',
		symbol: 'SPY',
		name: 'SPDR S&P 500 ETF',
		price: '512.33',
		changePercent: '0.32',
		description: 'ETF tracking the S&P 500 index.',
		type: AssetType.ETF,
	},
	{
		id: 'qqq',
		symbol: 'QQQ',
		name: 'Invesco QQQ Trust',
		price: '438.91',
		changePercent: '-1.12',
		description: 'ETF tracking the Nasdaq-100 index.',
		type: AssetType.ETF,
	},
	{
		id: 'btc',
		symbol: 'BTC',
		name: 'Bitcoin',
		price: '67250.44',
		changePercent: '2.87',
		description: 'Bitcoin is a decentralized digital currency.',
		type: AssetType.CRYPTO,
	},
	{
		id: 'eth',
		symbol: 'ETH',
		name: 'Ethereum',
		price: '3540.18',
		changePercent: '-0.91',
		description:
			'Ethereum is a blockchain platform with smart contract support.',
		type: AssetType.CRYPTO,
	},
];

async function main() {
	await prisma.asset.createMany({
		data: assets,
		skipDuplicates: true,
	});

	console.log('Seed completed');
}

main()
	.catch((error) => {
		console.error('Seed failed:', error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

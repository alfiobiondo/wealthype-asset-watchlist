import {
	AssetType as PrismaAssetType,
	type Asset as PrismaAsset,
} from '@prisma/client';
import { prisma } from '../lib/prisma';
import type { Asset, AssetType } from '../types/asset';

export interface GetAssetsFilters {
	search?: string;
	type?: string;
}

export function mapPrismaAssetType(type: PrismaAssetType): AssetType {
	switch (type) {
		case 'STOCK':
			return 'stock';
		case 'ETF':
			return 'etf';
		case 'CRYPTO':
			return 'crypto';
	}
}

export function mapAsset(record: PrismaAsset): Asset {
	return {
		id: record.id,
		symbol: record.symbol,
		name: record.name,
		price: Number(record.price),
		changePercent: Number(record.changePercent),
		description: record.description ?? '',
		type: mapPrismaAssetType(record.type),
	};
}

export async function getAssets(
	filters: GetAssetsFilters = {}
): Promise<Asset[]> {
	const { search, type } = filters;

	const result = await prisma.asset.findMany({
		where: {
			...(search
				? {
						OR: [
							{
								name: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								symbol: {
									contains: search,
									mode: 'insensitive',
								},
							},
						],
				  }
				: {}),
			...(type
				? {
						type: type.toUpperCase() as PrismaAssetType,
				  }
				: {}),
		},
		orderBy: {
			name: 'asc',
		},
	});

	return result.map(mapAsset);
}

export async function getAssetById(id: string): Promise<Asset | undefined> {
	const asset = await prisma.asset.findUnique({
		where: { id },
	});

	if (!asset) {
		return undefined;
	}

	return mapAsset(asset);
}

export async function getAssetTypes(): Promise<AssetType[]> {
	const types = await prisma.asset.findMany({
		select: { type: true },
		distinct: ['type'],
	});

	return types.map((item) => mapPrismaAssetType(item.type));
}

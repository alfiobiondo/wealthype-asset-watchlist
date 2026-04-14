import type { Asset } from '../types/asset';
import { prisma } from '../lib/prisma';
import { mapAsset } from './assets.service';

async function getWatchlistAssetsByUserId(userId: string): Promise<Asset[]> {
	const items = await prisma.watchlistItem.findMany({
		where: {
			userId,
		},
		include: {
			asset: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return items.map((item) => mapAsset(item.asset));
}

export async function getWatchlist(userId: string): Promise<Asset[]> {
	return getWatchlistAssetsByUserId(userId);
}

export async function addToWatchlist(userId: string, assetId: string) {
	const asset = await prisma.asset.findUnique({
		where: { id: assetId },
	});

	if (!asset) {
		return {
			success: false as const,
			status: 404,
			message: `Asset with id "${assetId}" not found.`,
		};
	}

	const existing = await prisma.watchlistItem.findUnique({
		where: {
			userId_assetId: {
				userId,
				assetId,
			},
		},
	});

	if (existing) {
		return {
			success: false as const,
			status: 409,
			message: `Asset with id "${assetId}" is already in watchlist.`,
		};
	}

	await prisma.watchlistItem.create({
		data: {
			userId,
			assetId,
		},
	});

	return {
		success: true as const,
		data: await getWatchlistAssetsByUserId(userId),
	};
}

export async function removeFromWatchlist(userId: string, assetId: string) {
	const existing = await prisma.watchlistItem.findUnique({
		where: {
			userId_assetId: {
				userId,
				assetId,
			},
		},
	});

	if (!existing) {
		return {
			success: false as const,
			status: 404,
			message: `Asset with id "${assetId}" is not in watchlist.`,
		};
	}

	await prisma.watchlistItem.delete({
		where: {
			userId_assetId: {
				userId,
				assetId,
			},
		},
	});

	return {
		success: true as const,
		data: await getWatchlistAssetsByUserId(userId),
	};
}

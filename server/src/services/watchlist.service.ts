import type { Asset } from '../types/asset';
import { prisma } from '../lib/prisma';
import { mapAsset } from './assets.service';

const DEMO_USER_EMAIL = 'demo@wealthype.local';

async function getDemoUser() {
	return prisma.user.upsert({
		where: { email: DEMO_USER_EMAIL },
		update: {},
		create: {
			email: DEMO_USER_EMAIL,
			passwordHash: 'demo-password-not-used',
			name: 'Demo User',
		},
	});
}

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

export async function getWatchlist(): Promise<Asset[]> {
	const user = await getDemoUser();
	return getWatchlistAssetsByUserId(user.id);
}

export async function addToWatchlist(assetId: string) {
	const user = await getDemoUser();

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
				userId: user.id,
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
			userId: user.id,
			assetId,
		},
	});

	return {
		success: true as const,
		data: await getWatchlistAssetsByUserId(user.id),
	};
}

export async function removeFromWatchlist(assetId: string) {
	const user = await getDemoUser();

	const existing = await prisma.watchlistItem.findUnique({
		where: {
			userId_assetId: {
				userId: user.id,
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
				userId: user.id,
				assetId,
			},
		},
	});

	return {
		success: true as const,
		data: await getWatchlistAssetsByUserId(user.id),
	};
}

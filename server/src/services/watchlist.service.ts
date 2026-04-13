import { watchlist } from '../data/watchlist';
import { getAssetById } from './assets.service';

export function getWatchlist() {
	return watchlist;
}

export function addToWatchlist(assetId: string) {
	const asset = getAssetById(assetId);

	if (!asset) {
		return {
			success: false as const,
			status: 404,
			message: `Asset with id "${assetId}" not found.`,
		};
	}

	if (watchlist.includes(assetId)) {
		return {
			success: false as const,
			status: 409,
			message: `Asset with id "${assetId}" is already in watchlist.`,
		};
	}

	watchlist.push(assetId);

	return {
		success: true as const,
		data: watchlist,
	};
}

export function removeFromWatchlist(assetId: string) {
	const index = watchlist.indexOf(assetId);

	if (index === -1) {
		return {
			success: false as const,
			status: 404,
			message: `Asset with id "${assetId}" is not in watchlist.`,
		};
	}

	watchlist.splice(index, 1);

	return {
		success: true as const,
		data: watchlist,
	};
}

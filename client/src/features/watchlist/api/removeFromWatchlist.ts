import type { Asset } from '../../assets/types';
import { ENV } from '../../../config/env';

export async function removeFromWatchlist(assetId: string): Promise<Asset[]> {
	const response = await fetch(`${ENV.API_BASE_URL}/api/watchlist/${assetId}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(
			errorData?.message ?? 'Failed to remove asset from watchlist'
		);
	}

	const data: Asset[] = await response.json();

	return data;
}

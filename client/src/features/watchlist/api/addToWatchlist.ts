import { ENV } from '../../../config/env';

export async function addToWatchlist(assetId: string): Promise<string[]> {
	const response = await fetch(`${ENV.API_BASE_URL}/api/watchlist/${assetId}`, {
		method: 'POST',
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => null);
		throw new Error(errorData?.message ?? 'Failed to add asset to watchlist');
	}

	const data: string[] = await response.json();

	return data;
}

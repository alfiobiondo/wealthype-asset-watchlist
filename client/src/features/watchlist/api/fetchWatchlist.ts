import type { Asset } from '../../assets/types';
import { ENV } from '../../../config/env';

export async function fetchWatchlist(signal?: AbortSignal): Promise<Asset[]> {
	const response = await fetch(`${ENV.API_BASE_URL}/api/watchlist`, {
		signal,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch watchlist');
	}

	const data: Asset[] = await response.json();

	return data;
}

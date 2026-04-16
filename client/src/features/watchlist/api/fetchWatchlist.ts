import type { Asset } from '../../assets/types';
import { apiClient } from '../../../lib/apiClient';

export async function fetchWatchlist(signal?: AbortSignal): Promise<Asset[]> {
	const response = await apiClient('/api/watchlist', {
		signal,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch watchlist');
	}

	const data: Asset[] = await response.json();

	return data;
}

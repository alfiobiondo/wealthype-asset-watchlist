import { ENV } from '../../../config/env';

export async function fetchWatchlist(signal?: AbortSignal): Promise<string[]> {
	const response = await fetch(`${ENV.API_BASE_URL}/api/watchlist`, {
		signal,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch watchlist');
	}

	const data: string[] = await response.json();

	return data;
}

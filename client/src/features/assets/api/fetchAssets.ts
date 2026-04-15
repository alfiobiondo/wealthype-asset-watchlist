import type { Asset, AssetType } from '../types';
import { ENV } from '../../../config/env';
import { apiClient } from '../../../lib/apiClient';

interface FetchAssetsParams {
	query?: string;
	category?: AssetType | 'all';
	signal?: AbortSignal;
}

export async function fetchAssets({
	query = '',
	category = 'all',
	signal,
}: FetchAssetsParams): Promise<Asset[]> {
	const params = new URLSearchParams();

	const normalizedQuery = query.trim().toLowerCase();

	// if (normalizedQuery === 'error') {
	// 	throw new Error('Simulated API error');
	// }

	if (normalizedQuery) {
		params.set('q', normalizedQuery);
	}

	if (category !== 'all') {
		params.set('type', category);
	}

	const response = await apiClient(
		`${ENV.API_BASE_URL}/api/assets?${params.toString()}`,
		{
			signal,
		}
	);

	if (!response.ok) {
		throw new Error('Failed to fetch assets');
	}

	const data: Asset[] = await response.json();

	return data;
}

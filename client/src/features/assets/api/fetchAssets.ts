import type { Asset, AssetType } from '../types';
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

	const queryString = params.toString();
	const path = queryString ? `/api/assets?${queryString}` : '/api/assets';

	const response = await apiClient(path, {
		signal,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch assets');
	}

	const data: Asset[] = await response.json();

	return data;
}

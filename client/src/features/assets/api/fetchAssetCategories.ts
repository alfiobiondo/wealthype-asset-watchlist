import type { AssetType } from '../types';
import { apiClient } from '../../../lib/apiClient';

interface FetchAssetCategoriesParams {
	signal?: AbortSignal;
}

export async function fetchAssetCategories({
	signal,
}: FetchAssetCategoriesParams = {}): Promise<AssetType[]> {
	const response = await apiClient('/api/asset-types', {
		signal,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch asset types');
	}

	const data: AssetType[] = await response.json();

	return data;
}

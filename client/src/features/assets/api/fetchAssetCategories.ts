import type { AssetType } from '../types';
import { ENV } from '../../../config/env';

interface FetchAssetCategoriesParams {
	signal?: AbortSignal;
}

export async function fetchAssetCategories({
	signal,
}: FetchAssetCategoriesParams = {}): Promise<AssetType[]> {
	const response = await fetch(`${ENV.API_BASE_URL}/api/asset-types`, {
		signal,
	});

	if (!response.ok) {
		throw new Error('Failed to fetch asset types');
	}

	const data: AssetType[] = await response.json();

	return data;
}

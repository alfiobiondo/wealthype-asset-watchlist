import type { Asset } from '../types';
import { apiClient } from '../../../lib/apiClient';

interface FetchAssetByIdParams {
	id: string;
	signal?: AbortSignal;
}

export async function fetchAssetById({
	id,
	signal,
}: FetchAssetByIdParams): Promise<Asset | null> {
	// if (id === 'error') {
	// 	throw new Error('Simulated asset detail error');
	// }

	const response = await apiClient(`/api/assets/${id}`, {
		signal,
	});

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error('Failed to fetch asset details');
	}

	const data: Asset = await response.json();

	return data;
}

import { mockAssets } from '../../../mocks/assets';
import type { Asset, AssetType } from '../types';

interface FetchAssetsParams {
	query?: string;
	category?: AssetType | 'all';
	signal?: AbortSignal;
}

function wait(ms: number, signal?: AbortSignal) {
	return new Promise<void>((resolve, reject) => {
		const timeoutId = window.setTimeout(() => {
			resolve();
		}, ms);

		signal?.addEventListener('abort', () => {
			window.clearTimeout(timeoutId);
			reject(new DOMException('Request aborted', 'AbortError'));
		});
	});
}

export async function fetchAssets({
	query = '',
	category = 'all',
	signal,
}: FetchAssetsParams): Promise<Asset[]> {
	await wait(500, signal);

	const normalizedQuery = query.trim().toLowerCase();

	if (normalizedQuery === 'error') {
		throw new Error('Simulated API error');
	}

	return mockAssets.filter((asset) => {
		const matchesQuery =
			!normalizedQuery ||
			asset.name.toLowerCase().includes(normalizedQuery) ||
			asset.symbol.toLowerCase().includes(normalizedQuery) ||
			asset.type.toLowerCase().includes(normalizedQuery);

		const matchesCategory = category === 'all' || asset.type === category;

		return matchesQuery && matchesCategory;
	});
}

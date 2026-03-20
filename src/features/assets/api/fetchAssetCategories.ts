import type { AssetType } from '../types';

interface FetchAssetCategoriesParams {
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

export async function fetchAssetCategories({
	signal,
}: FetchAssetCategoriesParams = {}): Promise<AssetType[]> {
	await wait(300, signal);

	return ['stock', 'etf', 'crypto'];
}

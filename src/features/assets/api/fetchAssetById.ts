import { mockAssets } from '../../../mocks/assets';
import type { Asset } from '../types';

interface FetchAssetByIdParams {
	id: string;
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

export async function fetchAssetById({
	id,
	signal,
}: FetchAssetByIdParams): Promise<Asset | null> {
	await wait(400, signal);

	if (id === 'error') {
		throw new Error('Simulated asset detail error');
	}

	const asset = mockAssets.find((item) => item.id === id);

	return asset ?? null;
}

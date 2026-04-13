import { assets } from '../data/assets';
import type { Asset, AssetType } from '../types/asset';

export interface GetAssetsFilters {
	search?: string;
	type?: string;
}

export function getAssets(filters: GetAssetsFilters = {}): Asset[] {
	const { search, type } = filters;

	let result = [...assets];

	if (search) {
		const normalizedSearch = search.trim().toLowerCase();

		result = result.filter((asset) => {
			return (
				asset.name.toLowerCase().includes(normalizedSearch) ||
				asset.symbol.toLowerCase().includes(normalizedSearch)
			);
		});
	}

	if (type) {
		result = result.filter((asset) => asset.type === type);
	}

	return result;
}

export function getAssetById(id: string): Asset | undefined {
	return assets.find((asset) => asset.id === id);
}

export function getAssetTypes(): AssetType[] {
	return Array.from(new Set(assets.map((asset) => asset.type)));
}

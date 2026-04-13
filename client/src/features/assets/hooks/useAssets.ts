import type { AssetType } from '../types';
import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../api/fetchAssets';

interface UseAssetsParams {
	query: string;
	category: AssetType | 'all';
}

export function useAssets({ query, category }: UseAssetsParams) {
	return useQuery({
		queryKey: ['assets', query, category],
		queryFn: ({ signal }) => fetchAssets({ query, category, signal }),
	});
}

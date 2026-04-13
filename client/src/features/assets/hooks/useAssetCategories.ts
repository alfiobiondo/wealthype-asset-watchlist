import { useQuery } from '@tanstack/react-query';
import { fetchAssetCategories } from '../api/fetchAssetCategories';

export function useAssetCategories() {
	return useQuery({
		queryKey: ['asset-categories'],
		queryFn: ({ signal }) => fetchAssetCategories({ signal }),
	});
}

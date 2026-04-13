import { useQuery } from '@tanstack/react-query';
import { fetchAssetById } from '../api/fetchAssetById';

interface UseAssetParams {
	id: string;
}

export function useAsset({ id }: UseAssetParams) {
	return useQuery({
		queryKey: ['asset', id],
		queryFn: ({ signal }) => fetchAssetById({ id, signal }),
		enabled: Boolean(id),
	});
}

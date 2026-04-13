import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToWatchlist } from '../api/addToWatchlist';
import { fetchWatchlist } from '../api/fetchWatchlist';
import { removeFromWatchlist } from '../api/removeFromWatchlist';

const WATCHLIST_QUERY_KEY = ['watchlist'];

export function useWatchlist() {
	const queryClient = useQueryClient();

	const { data: watchlist = [] } = useQuery({
		queryKey: WATCHLIST_QUERY_KEY,
		queryFn: ({ signal }) => fetchWatchlist(signal),
	});

	const addMutation = useMutation({
		mutationFn: addToWatchlist,
		onMutate: async (assetId: string) => {
			await queryClient.cancelQueries({ queryKey: WATCHLIST_QUERY_KEY });

			const previousWatchlist =
				queryClient.getQueryData<string[]>(WATCHLIST_QUERY_KEY) ?? [];

			queryClient.setQueryData<string[]>(
				WATCHLIST_QUERY_KEY,
				(current = []) => {
					if (current.includes(assetId)) {
						return current;
					}

					return [...current, assetId];
				}
			);

			return { previousWatchlist };
		},
		onError: (_error, _assetId, context) => {
			if (context?.previousWatchlist) {
				queryClient.setQueryData(
					WATCHLIST_QUERY_KEY,
					context.previousWatchlist
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: WATCHLIST_QUERY_KEY });
		},
	});

	const removeMutation = useMutation({
		mutationFn: removeFromWatchlist,
		onMutate: async (assetId: string) => {
			await queryClient.cancelQueries({ queryKey: WATCHLIST_QUERY_KEY });

			const previousWatchlist =
				queryClient.getQueryData<string[]>(WATCHLIST_QUERY_KEY) ?? [];

			queryClient.setQueryData<string[]>(WATCHLIST_QUERY_KEY, (current = []) =>
				current.filter((id) => id !== assetId)
			);

			return { previousWatchlist };
		},
		onError: (_error, _assetId, context) => {
			if (context?.previousWatchlist) {
				queryClient.setQueryData(
					WATCHLIST_QUERY_KEY,
					context.previousWatchlist
				);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: WATCHLIST_QUERY_KEY });
		},
	});

	function isInWatchlist(assetId: string) {
		return watchlist.includes(assetId);
	}

	function toggleWatchlist(assetId: string) {
		if (isInWatchlist(assetId)) {
			removeMutation.mutate(assetId);
			return;
		}

		addMutation.mutate(assetId);
	}

	return {
		watchlist,
		isInWatchlist,
		toggleWatchlist,
		isLoading: addMutation.isPending || removeMutation.isPending,
		error: addMutation.error ?? removeMutation.error ?? null,
	};
}

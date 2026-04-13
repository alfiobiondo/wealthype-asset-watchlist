import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Asset } from '../../assets/types';
import { addToWatchlist } from '../api/addToWatchlist';
import { fetchWatchlist } from '../api/fetchWatchlist';
import { removeFromWatchlist } from '../api/removeFromWatchlist';

const WATCHLIST_QUERY_KEY = ['watchlist'];

export function useWatchlist() {
	const queryClient = useQueryClient();

	const {
		data: watchlistAssets = [],
		isLoading: isWatchlistLoading,
		error: watchlistError,
	} = useQuery({
		queryKey: WATCHLIST_QUERY_KEY,
		queryFn: ({ signal }) => fetchWatchlist(signal),
	});

	const watchlistIds = useMemo(() => {
		return watchlistAssets.map((asset) => asset.id);
	}, [watchlistAssets]);

	const addMutation = useMutation({
		mutationFn: addToWatchlist,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: WATCHLIST_QUERY_KEY });

			const previousWatchlist =
				queryClient.getQueryData<Asset[]>(WATCHLIST_QUERY_KEY) ?? [];

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
		onSuccess: (updatedWatchlist) => {
			queryClient.setQueryData<Asset[]>(WATCHLIST_QUERY_KEY, updatedWatchlist);
		},
	});

	const removeMutation = useMutation({
		mutationFn: removeFromWatchlist,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: WATCHLIST_QUERY_KEY });

			const previousWatchlist =
				queryClient.getQueryData<Asset[]>(WATCHLIST_QUERY_KEY) ?? [];

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
		onSuccess: (updatedWatchlist) => {
			queryClient.setQueryData<Asset[]>(WATCHLIST_QUERY_KEY, updatedWatchlist);
		},
	});

	function isInWatchlist(assetId: string) {
		return watchlistIds.includes(assetId);
	}

	function toggleWatchlist(assetId: string) {
		if (isInWatchlist(assetId)) {
			removeMutation.mutate(assetId);
			return;
		}

		addMutation.mutate(assetId);
	}

	return {
		watchlistAssets,
		watchlistIds,
		isInWatchlist,
		toggleWatchlist,
		isLoading: isWatchlistLoading,
		isPending: addMutation.isPending || removeMutation.isPending,
		error: watchlistError ?? addMutation.error ?? removeMutation.error ?? null,
	};
}

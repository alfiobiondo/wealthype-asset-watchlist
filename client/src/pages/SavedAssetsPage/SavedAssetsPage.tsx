import { useMemo } from 'react';
import { AssetCard } from '../../components/AssetCard/AssetCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { useAssets } from '../../features/assets/hooks/useAssets';
import { useWatchlist } from '../../features/watchlist/hooks/useWatchlist';
import './SavedAssetsPage.css';
import { SavedAssetsLayout } from '../../layouts/SavedAssetsLayout/SavedAssetsLayout';

export function SavedAssetsPage() {
	const { watchlist, isInWatchlist, toggleWatchlist } = useWatchlist();

	const {
		data: assets = [],
		isLoading,
		isError,
		error,
	} = useAssets({
		query: '',
		category: 'all',
	});

	const savedAssets = useMemo(() => {
		return assets.filter((asset) => watchlist.includes(asset.id));
	}, [assets, watchlist]);

	if (isLoading) {
		return (
			<SavedAssetsLayout>
				<Spinner />
			</SavedAssetsLayout>
		);
	}

	if (isError) {
		return (
			<SavedAssetsLayout>
				<ErrorState
					title='Unable to load saved assets'
					description={
						error instanceof Error ? error.message : 'Something went wrong.'
					}
				/>
			</SavedAssetsLayout>
		);
	}

	return (
		<SavedAssetsLayout>
			<div className='saved-assets-page__summary'>
				<span className='saved-assets-page__count'>
					{savedAssets.length} {savedAssets.length === 1 ? 'asset' : 'assets'}{' '}
					saved
				</span>
			</div>

			{savedAssets.length === 0 ? (
				<EmptyState
					title='Your watchlist is empty'
					description='Add assets from the dashboard to keep track of them here.'
				/>
			) : (
				<div className='saved-assets-page__grid'>
					{savedAssets.map((asset) => (
						<AssetCard
							key={asset.id}
							asset={asset}
							isInWatchlist={isInWatchlist(asset.id)}
							onToggleWatchlist={() => toggleWatchlist(asset.id)}
						/>
					))}
				</div>
			)}
		</SavedAssetsLayout>
	);
}

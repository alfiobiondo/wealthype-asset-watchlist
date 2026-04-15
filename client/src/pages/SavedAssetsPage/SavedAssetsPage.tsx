import { AssetCard } from '../../components/AssetCard/AssetCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { useWatchlist } from '../../features/watchlist/hooks/useWatchlist';
import './SavedAssetsPage.css';
import { SavedAssetsLayout } from '../../layouts/SavedAssetsLayout/SavedAssetsLayout';
import { CircularProgress } from '@mui/material';

export function SavedAssetsPage() {
	const { watchlistAssets, isLoading, error, isInWatchlist, toggleWatchlist } =
		useWatchlist();

	if (isLoading) {
		return (
			<SavedAssetsLayout>
				<CircularProgress
					enableTrackSlot
					size={24}
					thickness={5.5}
					aria-label='Loading…'
					sx={(theme) => ({ color: theme.palette.brand.accentText })}
				/>
			</SavedAssetsLayout>
		);
	}

	if (error) {
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
					{watchlistAssets.length}{' '}
					{watchlistAssets.length === 1 ? 'asset' : 'assets'} saved
				</span>
			</div>

			{watchlistAssets.length === 0 ? (
				<EmptyState
					title='Your watchlist is empty'
					description='Add assets from the dashboard to keep track of them here.'
				/>
			) : (
				<div className='saved-assets-page__grid'>
					{watchlistAssets.map((asset) => (
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

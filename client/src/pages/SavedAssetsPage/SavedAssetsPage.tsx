import { Box, CircularProgress, Typography } from '@mui/material';
import { AssetCard } from '../../components/AssetCard/AssetCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { useWatchlist } from '../../features/watchlist/hooks/useWatchlist';
import { SavedAssetsLayout } from '../../layouts/SavedAssetsLayout/SavedAssetsLayout';

export function SavedAssetsPage() {
	const {
		watchlistAssets,
		isLoading,
		error,
		isInWatchlist,
		toggleWatchlist,
		isPending,
	} = useWatchlist();

	if (isLoading) {
		return (
			<SavedAssetsLayout>
				<Box
					aria-live='polite'
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1.25,
					}}
				>
					<CircularProgress
						enableTrackSlot
						size={24}
						thickness={5.5}
						aria-label='Loading…'
						sx={(theme) => ({ color: theme.palette.brand.accentText })}
					/>
					<Typography variant='body2' color='text.secondary'>
						Loading saved assets...
					</Typography>
				</Box>
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
			<Box sx={{ mb: 3 }}>
				<Typography
					variant='body2'
					sx={(theme) => ({
						display: 'inline-flex',
						alignItems: 'center',
						minHeight: 40,
						px: 2,
						borderRadius: theme.tokens.radius.pill,
						backgroundColor: theme.palette.surface.secondary,
						fontWeight: 600,
						color: 'text.secondary',
					})}
				>
					{watchlistAssets.length}{' '}
					{watchlistAssets.length === 1 ? 'asset' : 'assets'} saved
				</Typography>
			</Box>

			{watchlistAssets.length === 0 ? (
				<EmptyState
					title='Your watchlist is empty'
					description='Add assets from the dashboard to keep track of them here.'
				/>
			) : (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
						gap: 3,
					}}
				>
					{watchlistAssets.map((asset) => (
						<AssetCard
							key={asset.id}
							asset={asset}
							isInWatchlist={isInWatchlist(asset.id)}
							isPending={isPending}
							onToggleWatchlist={() => toggleWatchlist(asset.id)}
						/>
					))}
				</Box>
			)}
		</SavedAssetsLayout>
	);
}

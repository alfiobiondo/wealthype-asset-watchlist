import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { AssetCard } from '../../components/AssetCard/AssetCard';
import { AssetCardSkeleton } from '../../components/AssetCardSkeleton/AssetCardSkeleton';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { FiltersBar } from '../../components/FiltersBar/FiltersBar';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { useAssetFilters } from '../../features/assetFilters/hooks/useAssetFilters';
import { useAssetCategories } from '../../features/assets/hooks/useAssetCategories';
import { useAssets } from '../../features/assets/hooks/useAssets';
import { useWatchlist } from '../../features/watchlist/hooks/useWatchlist';
import { useDebouncedValue } from '../../lib/useDebouncedValue';

export function DashboardPage() {
	const {
		searchValue,
		setSearchValue,
		selectedCategory,
		setSelectedCategory,
		resetFilters,
	} = useAssetFilters();

	const debouncedSearchValue = useDebouncedValue(searchValue, 400);
	const { isInWatchlist, toggleWatchlist, isPending } = useWatchlist();

	const {
		data: categories = [],
		isLoading: isCategoriesLoading,
		isError: isCategoriesError,
	} = useAssetCategories();

	const {
		data: assets = [],
		isLoading: isAssetsLoading,
		isFetching,
		isError,
		error,
		refetch,
	} = useAssets({
		query: debouncedSearchValue,
		category: selectedCategory,
	});

	const hasActiveFilters =
		searchValue.trim().length > 0 || selectedCategory !== 'all';

	const isInitialLoading = isAssetsLoading || isCategoriesLoading;
	const showSearchingState = isFetching && !isAssetsLoading;
	const showEmptyState = !isAssetsLoading && !isError && assets.length === 0;
	const showAssets = !isAssetsLoading && !isError && assets.length > 0;

	return (
		<PageLayout
			eyebrow='Assetly'
			title='Your watchlist'
			subtitle='Search, filter and track your favorite assets.'
		>
			<FiltersBar
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={setSelectedCategory}
				onReset={resetFilters}
				showReset={hasActiveFilters}
				resultsCount={!isInitialLoading && !isError ? assets.length : undefined}
			/>

			{isCategoriesError ? (
				<Typography
					role='status'
					variant='body2'
					sx={{ color: 'text.secondary' }}
				>
					Unable to load asset categories. Search is still available.
				</Typography>
			) : null}

			<Box
				aria-live='polite'
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					minHeight: 32,
					visibility: showSearchingState ? 'visible' : 'hidden',
					opacity: showSearchingState ? 1 : 0,
					transition: 'opacity 0.2s ease',
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
					Searching assets...
				</Typography>
			</Box>

			{isInitialLoading ? (
				<Box
					component='section'
					aria-label='Loading assets'
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
						gap: 2.5,
					}}
				>
					{Array.from({ length: 6 }).map((_, index) => (
						<AssetCardSkeleton key={index} />
					))}
				</Box>
			) : null}

			{isError ? (
				<ErrorState
					title='Something went wrong'
					description={error instanceof Error ? error.message : 'Unknown error'}
					onRetry={refetch}
				/>
			) : null}

			{showEmptyState ? (
				<EmptyState
					title='No assets found'
					description={
						hasActiveFilters
							? 'No results matched your filters.'
							: 'No assets are currently available.'
					}
					action={
						hasActiveFilters ? (
							<Button
								type='button'
								variant='outlined'
								onClick={resetFilters}
								sx={(theme) => ({
									borderRadius: theme.tokens.radius.pill,
								})}
							>
								Reset filters
							</Button>
						) : undefined
					}
				/>
			) : null}

			{showAssets ? (
				<Box
					component='section'
					aria-label='Assets list'
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
						gap: 2.5,
					}}
				>
					{assets.map((asset) => (
						<AssetCard
							key={asset.id}
							asset={asset}
							isInWatchlist={isInWatchlist(asset.id)}
							isPending={isPending}
							onToggleWatchlist={() => toggleWatchlist(asset.id)}
						/>
					))}
				</Box>
			) : null}
		</PageLayout>
	);
}

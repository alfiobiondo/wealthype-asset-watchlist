import { AssetCard } from '../../components/AssetCard/AssetCard';
import { AssetCardSkeleton } from '../../components/AssetCardSkeleton/AssetCardSkeleton';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { FiltersBar } from '../../components/FiltersBar/FiltersBar';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { Spinner } from '../../components/Spinner/Spinner';
import { useAssetFilters } from '../../features/assetFilters/useAssetFilters';
import { useAssetCategories } from '../../features/assets/hooks/useAssetCategories';
import { useAssets } from '../../features/assets/hooks/useAssets';
import { useWatchlist } from '../../features/watchlist/useWatchlist';
import { useDebouncedValue } from '../../lib/useDebouncedValue';
import './DashboardPage.css';

export function DashboardPage() {
	const {
		searchValue,
		setSearchValue,
		selectedCategory,
		setSelectedCategory,
		resetFilters,
	} = useAssetFilters();

	const debouncedSearchValue = useDebouncedValue(searchValue, 400);
	const { isInWatchlist, toggleWatchlist } = useWatchlist();

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
		<main className='dashboard-page'>
			<header className='dashboard-page__header'>
				<PageHeader
					eyebrow='Wealthype'
					title='Your watchlist'
					subtitle='Search, filter and track your favorite assets.'
				/>

				<FiltersBar
					searchValue={searchValue}
					onSearchChange={setSearchValue}
					categories={categories}
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
					onReset={resetFilters}
					showReset={hasActiveFilters}
					resultsCount={
						!isInitialLoading && !isError ? assets.length : undefined
					}
				/>
			</header>

			{isCategoriesError && (
				<p role='status'>
					Unable to load asset categories. Search is still available.
				</p>
			)}

			<div
				className={`dashboard-page__searching ${
					showSearchingState ? 'dashboard-page__searching--visible' : ''
				}`}
				aria-live='polite'
			>
				<Spinner />
				<span>Searching assets...</span>
			</div>

			{isInitialLoading && (
				<section className='dashboard-page__grid' aria-label='Loading assets'>
					{Array.from({ length: 6 }).map((_, index) => (
						<AssetCardSkeleton key={index} />
					))}
				</section>
			)}

			{isError && (
				<ErrorState
					title='Something went wrong'
					description={error instanceof Error ? error.message : 'Unknown error'}
					onRetry={refetch}
				/>
			)}

			{showEmptyState && (
				<EmptyState
					title='No assets found'
					description={
						hasActiveFilters
							? 'No results matched your filters.'
							: 'No assets are currently available.'
					}
					action={
						hasActiveFilters ? (
							<button onClick={resetFilters}>Reset filters</button>
						) : undefined
					}
				/>
			)}

			{showAssets && (
				<section className='dashboard-page__grid' aria-label='Assets list'>
					{assets.map((asset) => (
						<AssetCard
							key={asset.id}
							asset={asset}
							isInWatchlist={isInWatchlist(asset.id)}
							onToggleWatchlist={() => toggleWatchlist(asset.id)}
						/>
					))}
				</section>
			)}
		</main>
	);
}

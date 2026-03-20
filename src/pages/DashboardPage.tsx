import { useState } from 'react';
import { AssetCard } from '../components/AssetCard/AssetCard';
import { CategoryFilter } from '../components/CategoryFilter/CategoryFilter';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { ErrorState } from '../components/ErrorState/ErrorState';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { useAssetCategories } from '../features/assets/hooks/useAssetCategories';
import { useAssets } from '../features/assets/hooks/useAssets';
import type { AssetType } from '../features/assets/types';
import { useWatchlist } from '../features/watchlist/useWatchlist';
import { useDebouncedValue } from '../lib/useDebouncedValue';

export function DashboardPage() {
	const [searchValue, setSearchValue] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<AssetType | 'all'>(
		'all'
	);

	const debouncedSearchValue = useDebouncedValue(searchValue, 400);

	const { isInWatchlist, toggleWatchlist } = useWatchlist();

	const {
		data: categories = [],
		isLoading: isCategoriesLoading,
		isError: isCategoriesError,
	} = useAssetCategories();

	const {
		data: assets = [],
		isLoading,
		isFetching,
		isError,
		error,
		refetch,
	} = useAssets({
		query: debouncedSearchValue,
		category: selectedCategory,
	});

	const hasSearchValue = debouncedSearchValue.trim().length > 0;

	return (
		<main>
			<h1>Asset Watchlist</h1>

			<SearchBar value={searchValue} onChange={setSearchValue} />

			{!isCategoriesLoading && !isCategoriesError && categories.length > 0 && (
				<CategoryFilter
					categories={categories}
					selectedCategory={selectedCategory}
					onSelectCategory={setSelectedCategory}
				/>
			)}

			{isCategoriesError && (
				<p>Unable to load asset categories. Search is still available.</p>
			)}

			{isFetching && !isLoading && <p>Searching assets...</p>}

			{(isLoading || isCategoriesLoading) && <p>Loading dashboard data...</p>}

			{isError && (
				<ErrorState
					title='Something went wrong'
					description={error instanceof Error ? error.message : 'Unknown error'}
					onRetry={() => refetch()}
				/>
			)}

			{!isLoading && !isError && assets.length === 0 && (
				<EmptyState
					title='No assets found'
					description={
						hasSearchValue || selectedCategory !== 'all'
							? 'No results matched your current filters. Try another search or category.'
							: 'No assets are currently available.'
					}
				/>
			)}

			{!isLoading && !isError && assets.length > 0 && (
				<section>
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

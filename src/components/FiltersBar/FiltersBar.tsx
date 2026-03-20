import { SearchBar } from '../SearchBar/SearchBar';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import type { AssetType } from '../../features/assets/types';
import './FiltersBar.css';

interface FiltersBarProps {
	searchValue: string;
	onSearchChange: (value: string) => void;
	categories: AssetType[];
	selectedCategory: AssetType | 'all';
	onCategoryChange: (category: AssetType | 'all') => void;
	onReset: () => void;
	showReset: boolean;
}

export function FiltersBar({
	searchValue,
	onSearchChange,
	categories,
	selectedCategory,
	onCategoryChange,
	onReset,
	showReset,
}: FiltersBarProps) {
	return (
		<section className='filters-bar' aria-label='Asset filters'>
			<SearchBar value={searchValue} onChange={onSearchChange} />

			<div className='filters-bar__footer'>
				{categories.length > 0 && (
					<CategoryFilter
						categories={categories}
						selectedCategory={selectedCategory}
						onSelectCategory={onCategoryChange}
					/>
				)}

				<button
					type='button'
					className={`filters-bar__reset ${
						showReset
							? 'filters-bar__reset--visible'
							: 'filters-bar__reset--hidden'
					}`}
					onClick={onReset}
					disabled={!showReset}
					aria-hidden={!showReset}
				>
					Reset filters
				</button>
			</div>
		</section>
	);
}

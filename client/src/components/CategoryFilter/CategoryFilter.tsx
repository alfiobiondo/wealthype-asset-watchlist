import type { AssetType } from '../../features/assets/types';
import './CategoryFilter.css';

interface CategoryFilterProps {
	categories: AssetType[];
	selectedCategory: AssetType | 'all';
	onSelectCategory: (category: AssetType | 'all') => void;
}

export function CategoryFilter({
	categories,
	selectedCategory,
	onSelectCategory,
}: CategoryFilterProps) {
	return (
		<div
			className='category-filter'
			role='group'
			aria-label='Filter assets by category'
		>
			<button
				type='button'
				className={`category-filter__button ${
					selectedCategory === 'all' ? 'category-filter__button--active' : ''
				}`}
				onClick={() => onSelectCategory('all')}
				aria-pressed={selectedCategory === 'all'}
			>
				All
			</button>

			{categories.map((category) => (
				<button
					key={category}
					type='button'
					className={`category-filter__button ${
						selectedCategory === category
							? 'category-filter__button--active'
							: ''
					}`}
					onClick={() => onSelectCategory(category)}
					aria-pressed={selectedCategory === category}
				>
					{category}
				</button>
			))}
		</div>
	);
}

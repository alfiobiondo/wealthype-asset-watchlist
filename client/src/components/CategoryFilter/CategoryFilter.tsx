import { Box, Button } from '@mui/material';
import type { AssetType } from '../../features/assets/types';

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
	function isActive(category: AssetType | 'all') {
		return selectedCategory === category;
	}

	return (
		<Box
			role='group'
			aria-label='Filter assets by category'
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: 1.5,
			}}
		>
			<Button
				type='button'
				variant={isActive('all') ? 'soft' : 'outlined'}
				onClick={() => onSelectCategory('all')}
				aria-pressed={isActive('all')}
				sx={(theme) => ({
					minHeight: 40,
					borderRadius: theme.tokens.radius.pill,
				})}
			>
				All
			</Button>

			{categories.map((category) => (
				<Button
					key={category}
					type='button'
					variant={isActive(category) ? 'soft' : 'outlined'}
					onClick={() => onSelectCategory(category)}
					aria-pressed={isActive(category)}
					sx={(theme) => ({
						minHeight: 40,
						borderRadius: theme.tokens.radius.pill,
						textTransform: 'capitalize',
					})}
				>
					{category}
				</Button>
			))}
		</Box>
	);
}

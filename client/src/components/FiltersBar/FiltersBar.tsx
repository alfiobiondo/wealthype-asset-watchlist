import { Box, Button, Paper, Typography } from '@mui/material';
import { SearchBar } from '../SearchBar/SearchBar';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import type { AssetType } from '../../features/assets/types';

interface FiltersBarProps {
	searchValue: string;
	onSearchChange: (value: string) => void;
	categories: AssetType[];
	selectedCategory: AssetType | 'all';
	onCategoryChange: (category: AssetType | 'all') => void;
	onReset: () => void;
	showReset: boolean;
	resultsCount?: number;
}

export function FiltersBar({
	searchValue,
	onSearchChange,
	categories,
	selectedCategory,
	onCategoryChange,
	onReset,
	showReset,
	resultsCount,
}: FiltersBarProps) {
	return (
		<Paper
			component='section'
			aria-label='Asset filters'
			elevation={0}
			sx={(theme) => ({
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				border: `1px solid ${theme.palette.border.default}`,
				borderRadius: theme.tokens.radius.lg,
				boxShadow: theme.tokens.shadows.sm,
				gap: theme.tokens.spacing.lg,
				backgroundColor: theme.palette.background.paper,
			})}
		>
			<SearchBar
				value={searchValue}
				onChange={onSearchChange}
				caption='Search assets'
			/>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 1.5,
				}}
			>
				{categories.length > 0 && (
					<CategoryFilter
						categories={categories}
						selectedCategory={selectedCategory}
						onSelectCategory={onCategoryChange}
					/>
				)}

				<Button
					type='button'
					variant='outlined'
					onClick={onReset}
					disabled={!showReset}
					sx={(theme) => ({
						visibility: showReset ? 'visible' : 'hidden',
						opacity: showReset ? 1 : 0,
						pointerEvents: showReset ? 'auto' : 'none',
						minHeight: 40,
						borderRadius: theme.tokens.radius.pill,
					})}
				>
					Reset filters
				</Button>
			</Box>

			{typeof resultsCount === 'number' && (
				<Box>
					<Typography
						variant='body2'
						aria-live='polite'
						sx={(theme) => ({
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							minHeight: 32,
							px: 1.5,
							borderRadius: theme.tokens.radius.pill,
							border: `1px solid ${theme.palette.border.default}`,
							backgroundColor: theme.palette.surface.tertiary,
							color: 'text.secondary',
							fontWeight: 500,
							whiteSpace: 'nowrap',
						})}
					>
						{resultsCount} {resultsCount === 1 ? 'asset' : 'assets'} found
					</Typography>
				</Box>
			)}
		</Paper>
	);
}

import { useEffect, useState } from 'react';
import type { AssetType } from '../../assets/types';
import {
	getStoredCategory,
	getStoredSearchValue,
	setStoredCategory,
	setStoredSearchValue,
} from '../lib/assetFilters.storage';

export function useAssetFilters() {
	const [searchValue, setSearchValue] = useState(() => getStoredSearchValue());
	const [selectedCategory, setSelectedCategory] = useState<AssetType | 'all'>(
		() => getStoredCategory()
	);

	useEffect(() => {
		setStoredSearchValue(searchValue);
	}, [searchValue]);

	useEffect(() => {
		setStoredCategory(selectedCategory);
	}, [selectedCategory]);

	function resetFilters() {
		setSearchValue('');
		setSelectedCategory('all');
	}

	return {
		searchValue,
		setSearchValue,
		selectedCategory,
		setSelectedCategory,
		resetFilters,
	};
}

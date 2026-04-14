import type { AssetType } from '../assets/types';

const SEARCH_SESSION_KEY = 'wealthype-search-value';
const CATEGORY_SESSION_KEY = 'wealthype-selected-category';

export function getStoredSearchValue(): string {
	return sessionStorage.getItem(SEARCH_SESSION_KEY) ?? '';
}

export function setStoredSearchValue(value: string) {
	sessionStorage.setItem(SEARCH_SESSION_KEY, value);
}

export function getStoredCategory(): AssetType | 'all' {
	const storedValue = sessionStorage.getItem(CATEGORY_SESSION_KEY);

	if (
		storedValue === 'stock' ||
		storedValue === 'etf' ||
		storedValue === 'crypto' ||
		storedValue === 'all'
	) {
		return storedValue;
	}

	return 'all';
}

export function setStoredCategory(value: AssetType | 'all') {
	sessionStorage.setItem(CATEGORY_SESSION_KEY, value);
}

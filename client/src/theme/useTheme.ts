import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

const THEME_KEY = 'theme';

function getInitialTheme(): ThemeMode {
	const savedTheme = localStorage.getItem(THEME_KEY);

	if (savedTheme === 'light' || savedTheme === 'dark') {
		return savedTheme;
	}

	return 'light';
}

export function useTheme() {
	const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem(THEME_KEY, theme);
	}, [theme]);

	function toggleTheme() {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	}

	return {
		theme,
		toggleTheme,
	};
}

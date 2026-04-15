import type { PaletteOptions } from '@mui/material/styles';
import type { ThemeMode } from '../ThemeProvider';
import { colorSchemes } from '../config/colors';

export function getPalette(mode: ThemeMode): PaletteOptions {
	const colors = colorSchemes[mode];

	return {
		mode,
		primary: {
			main: colors.brand.primary,
			dark: colors.brand.primaryHover,
			contrastText: colors.text.inverse,
		},
		secondary: {
			main: colors.brand.accent,
			dark: colors.brand.accentStrong,
			contrastText: colors.brand.contrast,
		},
		background: {
			default: colors.bg.app,
			paper: colors.surface.primary,
		},
		text: {
			primary: colors.text.primary,
			secondary: colors.text.secondary,
		},
		success: {
			main: colors.feedback.success,
		},
		error: {
			main: colors.feedback.danger,
		},
		divider: colors.border.default,

		brand: {
			...colors.brand,
		},
		surface: {
			...colors.surface,
		},
		border: {
			...colors.border,
		},
		feedback: {
			...colors.feedback,
		},
		focus: {
			...colors.focus,
		},
		skeleton: {
			...colors.skeleton,
		},
	};
}

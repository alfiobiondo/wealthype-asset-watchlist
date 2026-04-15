import { createTheme } from '@mui/material/styles';
import type { ThemeMode } from '../ThemeProvider';
import { getPalette } from './palette';
import { components } from './components';
import { typography } from './typography';
import { radius } from '../config/radius';
import { spacing } from '../config/spacing';
import { shadows } from '../config/shadows';
import { colorSchemes } from '../config/colors';
import { getMuiShadows } from './shadows';

function pxToNumber(value: string) {
	return Number.parseInt(value.replace('px', ''), 10);
}

export function createAppMuiTheme(mode: ThemeMode) {
	const colors = colorSchemes[mode];

	return createTheme({
		palette: getPalette(mode),
		shape: {
			borderRadius: pxToNumber(radius.md),
		},
		spacing: pxToNumber(spacing.sm),
		shadows: getMuiShadows(),
		typography,
		components,
		tokens: {
			radius,
			spacing,
			shadows,
			gradients: {
				brand: colors.gradient.brand,
			},
		},
	});
}

import type { Components, Theme } from '@mui/material/styles';

export const MuiSkeleton: Components<Theme>['MuiSkeleton'] = {
	styleOverrides: {
		root: ({ theme }) => ({
			backgroundColor: theme.palette.skeleton.base,
		}),
	},
};

import type { Components, Theme } from '@mui/material/styles';

export const MuiButton: Components<Theme>['MuiButton'] = {
	defaultProps: {
		variant: 'contained',
		disableElevation: true,
	},
	styleOverrides: {
		root: ({ theme }) => ({
			borderRadius: theme.tokens.radius.interactive,
			minHeight: 40,
			paddingInline: theme.spacing(2),
			fontSize: '1rem',
			fontWeight: 700,
			lineHeight: 1,
			textTransform: 'none',
			boxShadow: 'none',
			transition:
				'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.1s ease',
			'&:active': {
				transform: 'translateY(1px)',
			},
			'&.Mui-disabled': {
				opacity: 0.7,
			},
		}),
		contained: ({ theme }) => ({
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.primary.contrastText,
			'&:hover': {
				backgroundColor: theme.palette.primary.dark,
				boxShadow: 'none',
			},
		}),
		outlined: ({ theme }) => ({
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: theme.palette.border.default,
			backgroundColor: theme.palette.background.paper,
			color: theme.palette.text.primary,
			'&:hover': {
				borderColor: theme.palette.border.strong,
				backgroundColor: theme.palette.surface.secondary,
			},
		}),
		text: ({ theme }) => ({
			color: theme.palette.primary.main,
			'&:hover': {
				backgroundColor: theme.palette.surface.secondary,
			},
		}),
	},
	variants: [
		{
			props: { variant: 'soft' },
			style: ({ theme }) => ({
				border: `1px solid ${theme.palette.border.accent}`,
				backgroundColor: theme.palette.brand.accentSoft,
				color: theme.palette.brand.accentLink,
				'&:hover': {
					backgroundColor: theme.palette.brand.accentSoftHover,
					borderColor: theme.palette.border.accentHover,
					boxShadow: 'none',
				},
			}),
		},
	],
};

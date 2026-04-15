import type { Components, Theme } from '@mui/material/styles';

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
	styleOverrides: {
		root: ({ theme }) => ({
			borderRadius: theme.tokens.radius.interactive,
			backgroundColor: theme.palette.background.paper,
			color: theme.palette.text.primary,
			transition:
				'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',

			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: theme.palette.divider,
			},

			'&:hover .MuiOutlinedInput-notchedOutline': {
				borderColor: theme.palette.text.secondary,
			},

			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: theme.palette.brand.accent,
				borderWidth: 1,
			},

			'&.Mui-error .MuiOutlinedInput-notchedOutline': {
				borderColor: theme.palette.error.main,
			},

			'&.Mui-disabled': {
				opacity: 0.7,
			},
		}),
		input: ({ theme }) => ({
			padding: '14px 16px',
			fontSize: '1rem',
			lineHeight: 1.5,
			'&::placeholder': {
				color: theme.palette.text.secondary,
				opacity: 1,
			},
		}),
	},
};

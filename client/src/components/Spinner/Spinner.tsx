import { Box } from '@mui/material';

export function Spinner() {
	return (
		<Box
			aria-hidden='true'
			sx={(theme) => ({
				width: 24,
				height: 24,
				border: `3px solid ${theme.palette.border.default}`,
				borderTop: `3px solid ${theme.palette.brand.accentText}`,
				borderRadius: theme.tokens.radius.pill,
				animation: 'spin 0.8s linear infinite',
				'@keyframes spin': {
					to: {
						transform: 'rotate(360deg)',
					},
				},
			})}
		/>
	);
}

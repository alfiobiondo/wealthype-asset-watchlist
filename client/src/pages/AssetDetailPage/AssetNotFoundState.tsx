import { Box, Paper, Typography } from '@mui/material';

export function AssetNotFoundState() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Paper
				elevation={0}
				sx={(theme) => ({
					width: '100%',
					maxWidth: 960,
					p: { xs: 2.5, sm: 3 },
					border: `1px solid ${theme.palette.border.default}`,
					borderRadius: {
						xs: theme.tokens.radius.interactive,
						sm: theme.tokens.radius.surface,
					},
					boxShadow: theme.tokens.shadows.lg,
					backgroundColor: theme.palette.background.paper,
				})}
			>
				<Typography variant='eyebrow' sx={{ mb: 1.5, color: 'text.secondary' }}>
					Asset details
				</Typography>

				<Typography variant='title' component='h1' sx={{ mb: 1.5 }}>
					Asset not found
				</Typography>

				<Typography
					variant='body1'
					sx={{
						maxWidth: 560,
						lineHeight: 1.7,
						color: 'text.secondary',
					}}
				>
					The requested asset does not exist or is no longer available.
				</Typography>
			</Paper>
		</Box>
	);
}

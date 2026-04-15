import { Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';

export function AssetDetailLoadingState() {
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

				<Stack
					direction='row'
					spacing={1.25}
					aria-live='polite'
					sx={{ alignItems: 'center' }}
				>
					<CircularProgress
						enableTrackSlot
						size={24}
						thickness={5.5}
						aria-label='Loading…'
						sx={(theme) => ({ color: theme.palette.brand.accentText })}
					/>
					<Typography variant='body2' color='text.secondary'>
						Loading asset details...
					</Typography>
				</Stack>
			</Paper>
		</Box>
	);
}

import { Box, Paper, Typography } from '@mui/material';
import { ErrorState } from '../../components/ErrorState/ErrorState';

interface AssetDetailErrorStateProps {
	description: string;
	onRetry: () => void;
}

export function AssetDetailErrorState({
	description,
	onRetry,
}: AssetDetailErrorStateProps) {
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

				<ErrorState
					title='Unable to load asset'
					description={description}
					onRetry={onRetry}
				/>
			</Paper>
		</Box>
	);
}

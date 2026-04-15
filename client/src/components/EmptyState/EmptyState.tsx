import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
	title: string;
	description: string;
	action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
	return (
		<Box
			role='status'
			aria-live='polite'
			sx={(theme) => ({
				px: 2.5,
				py: 4,
				border: `1px dashed ${theme.palette.border.dashed}`,
				borderRadius: theme.tokens.radius.md,
				backgroundColor: theme.palette.background.paper,
				textAlign: 'center',
			})}
		>
			<Typography
				variant='h3'
				component='h2'
				sx={{
					mb: 1,
					fontSize: '1.25rem',
				}}
			>
				{title}
			</Typography>

			<Typography variant='body2' color='text.secondary'>
				{description}
			</Typography>

			{action ? <Box sx={{ mt: 2 }}>{action}</Box> : null}
		</Box>
	);
}

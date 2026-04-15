import { Box, Button, Typography } from '@mui/material';

interface ErrorStateProps {
	title: string;
	description: string;
	onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
	return (
		<Box
			role='alert'
			sx={(theme) => ({
				p: 3,
				border: `1px solid ${theme.palette.feedback.dangerBorder}`,
				borderRadius: theme.tokens.radius.md,
				backgroundColor: theme.palette.feedback.dangerSoft,
				textAlign: 'left',
			})}
		>
			<Typography
				variant='h3'
				component='h2'
				sx={(theme) => ({
					mb: 1,
					fontSize: '1.25rem',
					lineHeight: 1.2,
					color: theme.palette.feedback.dangerStrong,
				})}
			>
				{title}
			</Typography>

			<Typography
				variant='body1'
				sx={(theme) => ({
					mb: onRetry ? 2 : 0,
					color: theme.palette.feedback.dangerText,
				})}
			>
				{description}
			</Typography>

			{onRetry && (
				<Button
					type='button'
					variant='outlined'
					onClick={onRetry}
					sx={(theme) => ({
						minHeight: 40,
						borderRadius: theme.tokens.radius.pill,
						borderColor: theme.palette.border.dangerSoft,
						backgroundColor: theme.palette.background.paper,
						color: theme.palette.feedback.dangerStrong,
						'&:hover': {
							borderColor: theme.palette.feedback.dangerAccent,
							backgroundColor: theme.palette.feedback.dangerSofter,
						},
					})}
				>
					Retry
				</Button>
			)}
		</Box>
	);
}

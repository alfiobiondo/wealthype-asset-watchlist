import { Box, Link, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function NotFoundPage() {
	return (
		<Box
			component='main'
			sx={(theme) => ({
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				px: 3,
				py: 4,
				backgroundColor: theme.palette.background.default,
			})}
		>
			<Paper
				elevation={0}
				sx={(theme) => ({
					width: '100%',
					maxWidth: 520,
					p: 4,
					border: `1px solid ${theme.palette.border.default}`,
					borderRadius: theme.tokens.radius.surface,
					backgroundColor: theme.palette.background.paper,
					boxShadow: theme.tokens.shadows.lg,
					textAlign: 'center',
				})}
			>
				<Typography variant='eyebrow' sx={{ mb: 1.5, color: 'text.secondary' }}>
					404 error
				</Typography>

				<Typography variant='title' component='h1' sx={{ mb: 1.5 }}>
					Page not found
				</Typography>

				<Typography
					variant='body1'
					sx={{
						mb: 3,
						color: 'text.secondary',
					}}
				>
					The page you are looking for does not exist or may have been moved.
				</Typography>

				<Link
					component={RouterLink}
					to='/'
					underline='none'
					sx={(theme) => ({
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: 44,
						px: 2,
						borderRadius: theme.tokens.radius.pill,
						border: `1px solid ${theme.palette.border.muted}`,
						backgroundColor: theme.palette.surface.secondary,
						color: theme.palette.text.primary,
						fontSize: '0.95rem',
						fontWeight: 600,
						transition:
							'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
						'&:hover': {
							backgroundColor: theme.palette.surface.tertiary,
							borderColor: theme.palette.border.strong,
							textDecoration: 'none',
						},
						'&:active': {
							transform: 'translateY(1px)',
						},
						'&:focus-visible': {
							outline: `3px solid ${theme.palette.focus.ring}`,
							outlineOffset: 2,
						},
					})}
				>
					Back to dashboard
				</Link>
			</Paper>
		</Box>
	);
}

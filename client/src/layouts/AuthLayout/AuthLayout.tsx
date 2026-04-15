import type { ReactNode } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import './AuthLayout.css';

interface AuthLayoutProps {
	title: string;
	subtitle: string;
	card: ReactNode;
}

export function AuthLayout({ title, subtitle, card }: AuthLayoutProps) {
	return (
		<Box
			className='auth-page'
			sx={{
				backgroundColor: 'background.default',
			}}
		>
			<Box className='auth-page__shell'>
				<Stack
					direction='row'
					spacing={3}
					className='auth-page__brand'
					sx={{
						alignItems: 'flex-start',
					}}
				>
					<Box
						className='auth-page__brand-mark'
						sx={(theme) => ({
							borderRadius: theme.tokens.radius.lg,
							background: theme.tokens.gradients.brand,
							color: theme.palette.brand.contrast,
						})}
					>
						W
					</Box>

					<Stack spacing={1} sx={{ minWidth: 0, maxWidth: 520 }}>
						<Typography variant='eyebrow' sx={{ color: 'text.secondary' }}>
							Wealthype
						</Typography>

						<Typography
							variant='title'
							component='h1'
							sx={{ color: 'text.primary' }}
						>
							{title}
						</Typography>

						<Typography variant='subtitle' sx={{ color: 'text.secondary' }}>
							{subtitle}
						</Typography>
					</Stack>
				</Stack>

				<Paper
					elevation={0}
					sx={(theme) => ({
						p: 4,
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
						border: `1px solid ${theme.palette.border.soft}`,
						borderRadius: theme.tokens.radius.xl,
						boxShadow: theme.tokens.shadows.md,
						backgroundColor: theme.palette.background.paper,
					})}
				>
					{card}
				</Paper>
			</Box>
		</Box>
	);
}

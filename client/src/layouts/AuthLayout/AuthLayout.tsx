import type { ReactNode } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';

interface AuthLayoutProps {
	title: string;
	subtitle: string;
	card: ReactNode;
}

export function AuthLayout({ title, subtitle, card }: AuthLayoutProps) {
	return (
		<Box
			sx={(theme) => ({
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				px: { xs: 3, md: 4 },
				py: { xs: 3, md: 4 },
				backgroundColor: theme.palette.background.default,
			})}
		>
			<Box
				sx={{
					width: '100%',
					maxWidth: 1100,
					display: 'grid',
					gridTemplateColumns: {
						xs: '1fr',
						md: 'minmax(0, 1.1fr) minmax(420px, 0.9fr)',
					},
					gap: { xs: 3, md: 4 },
					alignItems: 'center',
				}}
			>
				<Stack direction='row' spacing={3} sx={{ alignItems: 'flex-start' }}>
					<Box
						sx={(theme) => ({
							width: 72,
							height: 72,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 26,
							fontWeight: 700,
							flexShrink: 0,
							borderRadius: theme.tokens.radius.surface,
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

						<Typography variant='title' component='h1'>
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
						p: { xs: 3, md: 4 },
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

import { Box, Stack, Typography } from '@mui/material';

interface SidebarHeaderProps {
	isOpen: boolean;
	isMobile: boolean;
}

export function SidebarHeader({ isOpen, isMobile }: SidebarHeaderProps) {
	return (
		<Stack
			direction='row'
			sx={{
				minHeight: 48,
				alignItems: 'center',
				justifyContent: isOpen ? 'flex-start' : 'center',
			}}
		>
			<Stack
				direction='row'
				spacing={1.5}
				sx={{
					minWidth: 0,
					width: isOpen ? 'auto' : '100%',
					alignItems: 'center',
					justifyContent: isOpen
						? 'flex-start'
						: isMobile && !isOpen
						? 'flex-start'
						: 'center',
				}}
			>
				<Box
					aria-hidden='true'
					sx={(theme) => ({
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 40,
						height: 40,
						borderRadius: theme.tokens.radius.sm,
						background: theme.tokens.gradients.brand,
						color: theme.palette.brand.contrast,
						fontSize: '0.95rem',
						fontWeight: 700,
						letterSpacing: '-0.02em',
						flexShrink: 0,
					})}
				>
					W
				</Box>

				{isOpen ? (
					<Box sx={{ minWidth: 0 }}>
						<Typography
							variant='body1'
							sx={{
								fontWeight: 700,
								lineHeight: 1.1,
								letterSpacing: '-0.02em',
								color: 'text.primary',
								whiteSpace: 'nowrap',
							}}
						>
							Wealthype
						</Typography>

						<Typography
							variant='caption'
							sx={{
								mt: 0.25,
								fontWeight: 500,
								lineHeight: 1,
								color: 'text.secondary',
								whiteSpace: 'nowrap',
							}}
						>
							Asset Watchlist
						</Typography>
					</Box>
				) : null}
			</Stack>
		</Stack>
	);
}

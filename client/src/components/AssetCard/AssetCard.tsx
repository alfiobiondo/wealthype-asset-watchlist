import { Box, Button, Paper, Stack, Typography, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Asset } from '../../features/assets/types';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

interface AssetCardProps {
	asset: Asset;
	isInWatchlist: boolean;
	isPending: boolean;
	onToggleWatchlist: () => void;
}

export function AssetCard({
	asset,
	isInWatchlist,
	onToggleWatchlist,
	isPending,
}: AssetCardProps) {
	const isPositive = asset.changePercent >= 0;

	return (
		<Paper
			component='article'
			elevation={0}
			sx={(theme) => ({
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				p: 2,
				border: `1px solid ${theme.palette.border.default}`,
				borderRadius: theme.tokens.radius.surface,
				boxShadow: theme.tokens.shadows.sm,
				backgroundColor: theme.palette.background.paper,
				transition:
					'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
				'&:hover': {
					transform: 'translateY(-2px)',
					boxShadow: theme.tokens.shadows.md,
					borderColor: theme.palette.border.muted,
				},
			})}
		>
			<Box sx={{ flex: 1 }}>
				<Box
					component={RouterLink}
					to={`/asset/${asset.id}`}
					aria-label={`View details for ${asset.name}`}
					sx={(theme) => ({
						display: 'block',
						color: 'inherit',
						textDecoration: 'none',
						borderRadius: theme.shape.borderRadius,
						'&:focus-visible': {
							outline: `3px solid ${theme.palette.focus.ring}`,
							outlineOffset: '4px',
						},
					})}
				>
					<Stack
						direction='row'
						spacing={1.5}
						sx={{
							mb: 2.5,
							justifyContent: 'space-between',
							alignItems: 'flex-start',
						}}
					>
						<Box sx={{ minWidth: 0 }}>
							<Typography
								variant='caption'
								sx={{
									mb: 0.75,
									fontWeight: 700,
									letterSpacing: '0.05em',
									textTransform: 'uppercase',
									color: 'text.secondary',
								}}
							>
								{asset.symbol}
							</Typography>

							<Typography
								variant='h3'
								component='h2'
								sx={{
									fontSize: '1.1rem',
									lineHeight: 1.3,
									letterSpacing: '-0.01em',
								}}
							>
								{asset.name}
							</Typography>
						</Box>

						<Chip
							label={asset.type}
							sx={(theme) => ({
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								minHeight: 28,
								px: 1.25,
								backgroundColor: theme.palette.brand.accentSoft,
								color: theme.palette.brand.accent,
								fontSize: '0.72rem',
								fontWeight: 700,
								letterSpacing: '0.04em',
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
								flexShrink: 0,
							})}
						/>
					</Stack>

					<Stack spacing={1}>
						<Typography
							variant='h3'
							sx={{
								fontSize: '1.75rem',
								lineHeight: 1.1,
								letterSpacing: '-0.02em',
							}}
						>
							{formatCurrency(asset.price)}
						</Typography>

						<Typography
							variant='body2'
							sx={(theme) => ({
								fontWeight: 600,
								color: isPositive
									? theme.palette.feedback.success
									: theme.palette.feedback.danger,
							})}
						>
							{formatPercentage(asset.changePercent)}
						</Typography>
					</Stack>
				</Box>
			</Box>

			<Button
				type='button'
				variant={isInWatchlist ? 'soft' : 'outlined'}
				onClick={onToggleWatchlist}
				disabled={isPending}
				aria-pressed={isInWatchlist}
				aria-label={
					isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
				}
				fullWidth
				sx={{
					mt: 2.5,
					minHeight: 44,
				}}
			>
				{isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
			</Button>
		</Paper>
	);
}

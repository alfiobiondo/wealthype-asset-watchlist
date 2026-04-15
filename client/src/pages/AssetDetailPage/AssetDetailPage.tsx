import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAsset } from '../../features/assets/hooks/useAsset';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import { AssetNotFoundState } from './AssetNotFoundState';
import { AssetDetailLoadingState } from './AssetDetailLoadingState';
import { AssetDetailErrorState } from './AssetDetailErrorState';
import { AssetDetailLayout } from '../../layouts/AssetDetailLayout/AssetDetailLayout';

export function AssetDetailPage() {
	const { id = '' } = useParams();

	const { data: asset, isLoading, isError, error, refetch } = useAsset({ id });

	if (isLoading) {
		return (
			<AssetDetailLayout>
				<AssetDetailLoadingState />
			</AssetDetailLayout>
		);
	}

	if (isError) {
		return (
			<AssetDetailLayout>
				<AssetDetailErrorState
					description={error instanceof Error ? error.message : 'Unknown error'}
					onRetry={refetch}
				/>
			</AssetDetailLayout>
		);
	}

	if (!asset) {
		return (
			<AssetDetailLayout>
				<AssetNotFoundState />
			</AssetDetailLayout>
		);
	}

	const isPositive = asset.changePercent >= 0;

	return (
		<AssetDetailLayout>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Paper
					component='article'
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
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={2}
						sx={{
							mb: 3,
							justifyContent: 'space-between',
							alignItems: { xs: 'flex-start', sm: 'center' },
						}}
					>
						<Box>
							<Typography
								variant='eyebrow'
								sx={{ mb: 1, color: 'text.secondary' }}
							>
								{asset.symbol}
							</Typography>

							<Typography variant='title' component='h1'>
								{asset.name}
							</Typography>
						</Box>

						<Chip
							label={asset.type}
							sx={(theme) => ({
								minHeight: 32,
								px: 1.5,
								borderRadius: theme.tokens.radius.pill,
								backgroundColor: theme.palette.brand.accentSoft,
								color: theme.palette.brand.accentStrong,
								fontSize: '0.8rem',
								fontWeight: 700,
								textTransform: 'uppercase',
								letterSpacing: '0.04em',
							})}
						/>
					</Stack>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								sm: 'repeat(2, minmax(0, 1fr))',
							},
							gap: 2,
							mb: 3,
						}}
					>
						<Box
							sx={(theme) => ({
								p: 2,
								borderRadius: theme.tokens.radius.interactive,
								backgroundColor: theme.palette.background.default,
								border: `1px solid ${theme.palette.surface.tertiary}`,
							})}
						>
							<Typography
								variant='caption'
								sx={{
									display: 'block',
									mb: 1,
									fontWeight: 700,
									letterSpacing: '0.05em',
									textTransform: 'uppercase',
									color: 'text.secondary',
								}}
							>
								Current price
							</Typography>

							<Typography
								variant='h3'
								sx={{
									fontSize: { xs: '1.75rem', sm: '2rem' },
									letterSpacing: '-0.02em',
								}}
							>
								{formatCurrency(asset.price)}
							</Typography>
						</Box>

						<Box
							sx={(theme) => ({
								p: 2,
								borderRadius: theme.tokens.radius.interactive,
								backgroundColor: theme.palette.background.default,
								border: `1px solid ${theme.palette.surface.tertiary}`,
							})}
						>
							<Typography
								variant='caption'
								sx={{
									display: 'block',
									mb: 1,
									fontWeight: 700,
									letterSpacing: '0.05em',
									textTransform: 'uppercase',
									color: 'text.secondary',
								}}
							>
								24h change
							</Typography>

							<Typography
								variant='h3'
								sx={(theme) => ({
									fontSize: { xs: '1.25rem', sm: '1.5rem' },
									color: isPositive
										? theme.palette.feedback.success
										: theme.palette.feedback.danger,
								})}
							>
								{formatPercentage(asset.changePercent)}
							</Typography>
						</Box>
					</Box>

					<Box sx={{ pt: 1 }}>
						<Typography
							variant='caption'
							sx={{
								display: 'block',
								mb: 1,
								fontWeight: 700,
								letterSpacing: '0.05em',
								textTransform: 'uppercase',
								color: 'text.secondary',
							}}
						>
							About this asset
						</Typography>

						<Typography
							variant='body1'
							sx={{
								lineHeight: 1.6,
								color: 'text.primary',
							}}
						>
							{asset.description}
						</Typography>
					</Box>
				</Paper>
			</Box>
		</AssetDetailLayout>
	);
}

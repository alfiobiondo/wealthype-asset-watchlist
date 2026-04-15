import { Box } from '@mui/material';

export function AssetCardSkeleton() {
	return (
		<Box
			aria-hidden='true'
			sx={(theme) => ({
				position: 'relative',
				overflow: 'hidden',
				height: 220,
				borderRadius: theme.tokens.radius.lg,
				backgroundColor: 'var(--color-skeleton-base)',
				'&::after': {
					content: '""',
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
					transform: 'translateX(-100%)',
					animation: 'asset-card-shimmer 1.4s ease-in-out infinite',
				},
				'@keyframes asset-card-shimmer': {
					'100%': {
						transform: 'translateX(100%)',
					},
				},
			})}
		/>
	);
}

import { Paper, Skeleton, Stack } from '@mui/material';

export function AssetCardSkeleton() {
	return (
		<Paper
			aria-hidden='true'
			elevation={0}
			sx={(theme) => ({
				p: 2,
				border: `1px solid ${theme.palette.border.default}`,
				borderRadius: theme.tokens.radius.surface,
				boxShadow: theme.tokens.shadows.sm,
				backgroundColor: theme.palette.background.paper,
			})}
		>
			<Stack spacing={1}>
				<Stack
					direction='row'
					spacing={1}
					sx={{ justifyContent: 'space-between' }}
				>
					<Stack spacing={1} sx={{ flex: 1 }}>
						<Skeleton variant='text' width='30%' height={20} />
						<Skeleton variant='text' width='70%' height={32} />
					</Stack>

					<Skeleton
						variant='rounded'
						width={72}
						height={28}
						sx={(theme) => ({
							borderRadius: theme.tokens.radius.pill,
							flexShrink: 0,
						})}
					/>
				</Stack>

				<Stack spacing={1}>
					<Skeleton variant='text' width='45%' height={44} />
					<Skeleton variant='text' width='25%' height={24} />
				</Stack>

				<Skeleton
					variant='rounded'
					width='100%'
					height={44}
					sx={(theme) => ({
						borderRadius: theme.tokens.radius.pill,
					})}
				/>
			</Stack>
		</Paper>
	);
}

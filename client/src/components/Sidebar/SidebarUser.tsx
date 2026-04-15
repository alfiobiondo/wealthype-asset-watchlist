import { Box, Skeleton, Typography } from '@mui/material';

interface SidebarUserProps {
	isOpen: boolean;
	isLoading: boolean;
	displayName: string;
	avatarLetter: string;
}

export function SidebarUser({
	isOpen,
	isLoading,
	displayName,
	avatarLetter,
}: SidebarUserProps) {
	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				gap: 1.5,
				pb: 2,
				borderBottom: `1px solid ${theme.palette.border.default}`,
				justifyContent: isOpen ? 'flex-start' : 'center',
			})}
		>
			{isLoading ? (
				<Skeleton
					variant='rounded'
					width={40}
					height={40}
					sx={(theme) => ({
						borderRadius: theme.tokens.radius.sm,
						flexShrink: 0,
					})}
				/>
			) : (
				<Box
					sx={(theme) => ({
						width: 40,
						height: 40,
						borderRadius: theme.tokens.radius.sm,
						background: theme.tokens.gradients.brand,
						color: theme.palette.brand.contrast,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '0.875rem',
						fontWeight: 700,
						flexShrink: 0,
					})}
				>
					{avatarLetter}
				</Box>
			)}

			{isOpen ? (
				<Box sx={{ minWidth: 0 }}>
					<Typography
						variant='caption'
						sx={{ color: 'text.secondary', display: 'block' }}
					>
						Signed in
					</Typography>

					{isLoading ? (
						<Skeleton
							variant='text'
							width={120}
							sx={{
								fontSize: '0.95rem',
								transform: 'none',
							}}
						/>
					) : (
						<Typography
							variant='body2'
							sx={{
								fontWeight: 600,
								color: 'text.primary',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							}}
						>
							{displayName}
						</Typography>
					)}
				</Box>
			) : null}
		</Box>
	);
}

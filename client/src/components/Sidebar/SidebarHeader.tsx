import { Box, Stack, Typography } from '@mui/material';
import { AssetlyLogo } from '../AssetlyLogo/AssetlyLogo';

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
				<AssetlyLogo size={40} alt='Assetly' />

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
							Assetly
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

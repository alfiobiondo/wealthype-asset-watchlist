import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { Box, Stack } from '@mui/material';
import { useWatchlist } from '../../features/watchlist/hooks/useWatchlist';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useCurrentUser } from '../../features/auth/hooks/useCurrentUser';
import { useTheme } from '../../theme/useTheme';
import { SidebarHeader } from './SidebarHeader';
import { SidebarUser } from './SidebarUser';
import { SidebarButtonItem, SidebarLinkItem } from './SidebarItem';
import { useResponsive } from '../../lib/useResponsive';

interface SidebarProps {
	isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
	const { watchlistAssets } = useWatchlist();
	const { logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const { data, isLoading } = useCurrentUser();
	const { isMobile } = useResponsive();

	const user = data?.user;
	const savedCount = watchlistAssets.length;

	const displayName = user?.name || user?.email || 'User';
	const avatarLetter = displayName?.[0]?.toUpperCase() ?? 'U';
	const isDark = theme === 'dark';

	const shouldHideCollapsibleContent = isMobile && !isOpen;

	return (
		<Box
			component='aside'
			aria-label='Primary navigation'
			sx={(theme) => ({
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				width: isMobile
					? '100%'
					: isOpen
					? theme.tokens.layout.sidebar.openWidth
					: theme.tokens.layout.sidebar.closedWidth,
				minHeight: isMobile ? 'auto' : '100vh',
				px: isMobile ? 2 : isOpen ? 2 : 1.5,
				py: isMobile ? 2 : 2.5,
				borderRight: isMobile
					? 'none'
					: `1px solid ${theme.palette.border.default}`,
				borderBottom: isMobile
					? `1px solid ${theme.palette.border.default}`
					: 'none',
				backgroundColor: theme.palette.background.paper,
				transition: 'width 0.2s ease, padding 0.2s ease',
			})}
		>
			<SidebarHeader isOpen={isOpen} isMobile={isMobile} />

			{!shouldHideCollapsibleContent ? (
				<Stack component='nav' spacing={1}>
					<SidebarLinkItem
						to='/'
						label='Dashboard'
						icon={<DashboardRoundedIcon fontSize='small' />}
						isOpen={isOpen}
					/>

					<SidebarLinkItem
						to='/saved'
						label='Saved assets'
						icon={<StarRoundedIcon fontSize='small' />}
						isOpen={isOpen}
						badge={savedCount}
					/>
				</Stack>
			) : null}

			{!shouldHideCollapsibleContent ? (
				<Box
					sx={(theme) => ({
						mt: 'auto',
						pt: 2,
						borderTop: `1px solid ${theme.palette.border.default}`,
						display: 'flex',
						flexDirection: 'column',
						gap: 1.5,
					})}
				>
					<SidebarUser
						isOpen={isOpen}
						isLoading={isLoading}
						displayName={displayName}
						avatarLetter={avatarLetter}
					/>

					<SidebarButtonItem
						label='Log out'
						icon={<LogoutRoundedIcon fontSize='small' />}
						onClick={logout}
						isOpen={isOpen}
					/>

					<SidebarButtonItem
						label={isDark ? 'Light mode' : 'Dark mode'}
						icon={
							isDark ? (
								<LightModeRoundedIcon fontSize='small' />
							) : (
								<DarkModeRoundedIcon fontSize='small' />
							)
						}
						onClick={toggleTheme}
						isOpen={isOpen}
						isActive={isDark}
						aria-label={
							isDark ? 'Switch to light theme' : 'Switch to dark theme'
						}
						aria-pressed={isDark}
					/>
				</Box>
			) : null}
		</Box>
	);
}

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { NavLink } from 'react-router-dom';
import { useWatchlist } from '../../features/watchlist/hooks/useWatchlist';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useCurrentUser } from '../../features/auth/hooks/useCurrentUser';
import { useTheme } from '../../theme/useTheme';
import './Sidebar.css';

interface SidebarProps {
	isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
	const { watchlistAssets } = useWatchlist();
	const { logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const { data, isLoading } = useCurrentUser();

	const user = data?.user;
	const savedCount = watchlistAssets.length;

	const displayName = user?.name || user?.email || 'User';
	const avatarLetter = displayName?.[0]?.toUpperCase() ?? 'U';

	const isDark = theme === 'dark';

	return (
		<aside
			className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}
			aria-label='Primary navigation'
		>
			<div className='sidebar__header'>
				<div className='sidebar__brand-block'>
					<span className='sidebar__brand-mark' aria-hidden='true'>
						W
					</span>

					{isOpen ? (
						<div className='sidebar__brand-copy'>
							<span className='sidebar__brand-name'>Wealthype</span>
							<span className='sidebar__brand-subtitle'>Asset Watchlist</span>
						</div>
					) : null}
				</div>
			</div>

			<nav className='sidebar__nav'>
				<NavLink
					to='/'
					end
					className={({ isActive }) =>
						`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
					}
				>
					<span className='sidebar__icon' aria-hidden='true'>
						<DashboardRoundedIcon fontSize='small' />
					</span>

					{isOpen ? (
						<span className='sidebar__link-content'>
							<span className='sidebar__label'>Dashboard</span>
						</span>
					) : null}
				</NavLink>

				<NavLink
					to='/saved'
					className={({ isActive }) =>
						`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
					}
				>
					<span className='sidebar__icon' aria-hidden='true'>
						<StarRoundedIcon fontSize='small' />
					</span>

					{isOpen ? (
						<span className='sidebar__link-content'>
							<span className='sidebar__label'>Saved assets</span>
							<span className='sidebar__badge'>{savedCount}</span>
						</span>
					) : null}
				</NavLink>
			</nav>

			<div className='sidebar__footer'>
				<div className='sidebar__account'>
					<div className='sidebar__account-block'>
						<div className='sidebar__account-avatar'>
							{isLoading ? (
								<div className='sidebar__skeleton-avatar' />
							) : (
								avatarLetter
							)}
						</div>
					</div>

					{isOpen ? (
						<div className='sidebar__account-copy'>
							<span className='sidebar__account-label'>Signed in</span>

							{isLoading ? (
								<div className='sidebar__skeleton-line sidebar__skeleton-line--long' />
							) : (
								<span className='sidebar__account-id'>{displayName}</span>
							)}
						</div>
					) : null}
				</div>

				<button type='button' className='sidebar__logout' onClick={logout}>
					<span className='sidebar__icon' aria-hidden='true'>
						<LogoutRoundedIcon fontSize='small' />
					</span>

					{isOpen && <span>Log out</span>}
				</button>

				<button
					type='button'
					className='sidebar__theme-toggle'
					onClick={toggleTheme}
					aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
					aria-pressed={isDark}
				>
					<span className='sidebar__icon' aria-hidden='true'>
						{isDark ? (
							<LightModeRoundedIcon fontSize='small' />
						) : (
							<DarkModeRoundedIcon fontSize='small' />
						)}
					</span>

					{isOpen && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
				</button>
			</div>
		</aside>
	);
}

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { NavLink } from 'react-router-dom';
import { useWatchlist } from '../../features/watchlist/hooks/useWatchlist';
import './Sidebar.css';

interface SidebarProps {
	isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
	const { watchlistAssets } = useWatchlist();
	const savedCount = watchlistAssets.length;

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
		</aside>
	);
}

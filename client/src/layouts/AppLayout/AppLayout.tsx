import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { useSidebar } from '../../features/assets/hooks/useSidebar';
import './AppLayout.css';

export function AppLayout() {
	const { isOpen, toggle } = useSidebar();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth <= 768);
		check();
		window.addEventListener('resize', check);
		return () => window.removeEventListener('resize', check);
	}, []);

	return (
		<div
			className={`app-layout ${
				isOpen ? 'app-layout--sidebar-open' : 'app-layout--sidebar-closed'
			}`}
		>
			<div className='app-layout__sidebar-wrapper'>
				<Sidebar isOpen={isOpen} />

				<button
					type='button'
					className='app-layout__sidebar-toggle'
					onClick={toggle}
					aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
					aria-expanded={isOpen}
				>
					{isMobile ? (
						isOpen ? (
							<KeyboardDoubleArrowUpRoundedIcon fontSize='small' />
						) : (
							<KeyboardDoubleArrowDownRoundedIcon fontSize='small' />
						)
					) : isOpen ? (
						<KeyboardDoubleArrowLeftRoundedIcon fontSize='small' />
					) : (
						<KeyboardDoubleArrowRightRoundedIcon fontSize='small' />
					)}
				</button>
			</div>

			<div className='app-layout__main'>
				<Outlet />
			</div>
		</div>
	);
}

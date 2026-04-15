import { Box, IconButton } from '@mui/material';
import { Outlet } from 'react-router-dom';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { useSidebar } from '../../features/assets/hooks/useSidebar';
import { useResponsive } from '../../lib/useResponsive';

export function AppLayout() {
	const { isOpen, toggle } = useSidebar();
	const { isMobile } = useResponsive();

	return (
		<Box
			sx={(theme) => ({
				display: 'grid',
				gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
				minHeight: '100vh',
				backgroundColor: theme.palette.background.default,
			})}
		>
			<Box
				sx={{
					position: 'relative',
				}}
			>
				<Sidebar isOpen={isOpen} />

				<IconButton
					onClick={toggle}
					aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
					aria-expanded={isOpen}
					sx={(theme) => ({
						position: 'absolute',
						top: isMobile ? 'auto' : 24,
						right: isMobile ? 16 : -14,
						bottom: isMobile ? -14 : 'auto',
						zIndex: 20,
						width: 28,
						height: 28,
						border: `1px solid ${theme.palette.border.strong}`,
						borderRadius: theme.tokens.radius.pill,
						backgroundColor: theme.palette.background.paper,
						color: theme.palette.text.secondary,
						boxShadow: theme.shadows[3],
						transition:
							'background-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
						'&:hover': {
							backgroundColor: theme.palette.surface.secondary,
							color: theme.palette.text.primary,
							boxShadow: theme.shadows[5],
						},
						'&:active': {
							transform: 'scale(0.96)',
						},
						'&:focus-visible': {
							outline: `3px solid ${theme.palette.focus.ring}`,
							outlineOffset: 2,
						},
					})}
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
				</IconButton>
			</Box>

			<Box
				sx={{
					minWidth: 0,
					minHeight: '100vh',
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
}

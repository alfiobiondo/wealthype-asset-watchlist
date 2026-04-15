import { Box, Button, Link, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface SidebarItemContentProps {
	icon: React.ReactNode;
	label: string;
	isOpen: boolean;
	badge?: number;
}

function SidebarItemContent({
	icon,
	label,
	isOpen,
	badge,
}: SidebarItemContentProps) {
	return (
		<>
			<Box
				component='span'
				aria-hidden='true'
				sx={{
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: 24,
					flexShrink: 0,
				}}
			>
				{icon}
			</Box>

			{isOpen ? (
				<Stack
					direction='row'
					spacing={1.5}
					sx={{
						width: '100%',
						minWidth: 0,
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Box
						component='span'
						sx={{
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{label}
					</Box>

					{typeof badge === 'number' ? (
						<Box
							component='span'
							sx={(theme) => ({
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								minWidth: 28,
								height: 28,
								px: 1,
								borderRadius: theme.tokens.radius.pill,
								backgroundColor: theme.palette.background.default,
								color: theme.palette.text.primary,
								fontSize: '0.8rem',
								fontWeight: 700,
								lineHeight: 1,
								flexShrink: 0,
							})}
						>
							{badge}
						</Box>
					) : null}
				</Stack>
			) : null}
		</>
	);
}

function getBaseItemStyles(isOpen: boolean, isActive?: boolean) {
	return (theme: any) => ({
		display: 'inline-flex',
		alignItems: 'center',
		gap: 1.5,
		minHeight: 48,
		width: '100%',
		px: isOpen ? 1.5 : 0,
		justifyContent: isOpen ? 'flex-start' : 'center',
		borderRadius: theme.tokens.radius.md,
		fontWeight: 600,
		transition: 'background-color 0.2s ease, color 0.2s ease',
		color: isActive
			? theme.palette.brand.accentText
			: theme.palette.text.tertiary,
		backgroundColor: isActive ? theme.palette.brand.accentSoft : 'transparent',
		'&:hover': {
			backgroundColor: isActive
				? theme.palette.brand.accentSoftHover
				: theme.palette.surface.tertiary,
			color: theme.palette.text.primary,
			textDecoration: 'none',
		},
	});
}

interface SidebarLinkItemProps {
	to: string;
	label: string;
	icon: React.ReactNode;
	isOpen: boolean;
	badge?: number;
}

export function SidebarLinkItem({
	to,
	label,
	icon,
	isOpen,
	badge,
}: SidebarLinkItemProps) {
	return (
		<Link
			component={NavLink}
			to={to}
			underline='none'
			sx={(theme) => ({
				...getBaseItemStyles(isOpen)(theme),
				'&.active': {
					backgroundColor: theme.palette.brand.accentSoft,
					color: theme.palette.brand.accent,
				},
			})}
		>
			<SidebarItemContent
				icon={icon}
				label={label}
				isOpen={isOpen}
				badge={badge}
			/>
		</Link>
	);
}

interface SidebarButtonItemProps {
	label: string;
	icon: React.ReactNode;
	onClick: () => void;
	isOpen: boolean;
	isActive?: boolean;
	'aria-label'?: string;
	'aria-pressed'?: boolean;
}

export function SidebarButtonItem({
	label,
	icon,
	onClick,
	isOpen,
	isActive = false,
	...ariaProps
}: SidebarButtonItemProps) {
	return (
		<Button
			type='button'
			onClick={onClick}
			variant='text'
			{...ariaProps}
			sx={getBaseItemStyles(isOpen, isActive)}
		>
			<SidebarItemContent icon={icon} label={label} isOpen={isOpen} />
		</Button>
	);
}

import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface PageBackLinkProps {
	to: string;
	label: string;
}

export function PageBackLink({ to, label }: PageBackLinkProps) {
	return (
		<Box component='p' sx={{ m: 0 }}>
			<Link
				component={RouterLink}
				to={to}
				underline='none'
				sx={(theme) => ({
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 1,
					minHeight: 44,
					px: 2,
					borderRadius: theme.tokens.radius.pill,
					border: `1px solid ${theme.palette.border.muted}`,
					backgroundColor: theme.palette.surface.secondary,
					color: theme.palette.text.primary,
					fontSize: '0.95rem',
					fontWeight: 600,
					whiteSpace: 'nowrap',
					transition:
						'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
					'&:hover': {
						backgroundColor: theme.palette.surface.tertiary,
						borderColor: theme.palette.border.strong,
						textDecoration: 'none',
					},
					'&:active': {
						transform: 'translateY(1px)',
					},
					'&:focus-visible': {
						outline: `3px solid ${theme.palette.focus.ring}`,
						outlineOffset: '2px',
					},
				})}
			>
				<Box
					component='span'
					aria-hidden='true'
					sx={{
						fontSize: '1rem',
						lineHeight: 1,
					}}
				>
					←
				</Box>
				<Box component='span'>{label}</Box>
			</Link>
		</Box>
	);
}

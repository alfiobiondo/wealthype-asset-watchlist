import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	align?: 'left' | 'center';
}

export function PageHeader({
	eyebrow,
	title,
	subtitle,
	align = 'left',
}: PageHeaderProps) {
	const isCentered = align === 'center';

	return (
		<Box
			component='header'
			sx={{
				mb: 2,
				textAlign: align,
			}}
		>
			{eyebrow && (
				<Typography
					variant='eyebrow'
					sx={{ color: 'text.secondary', mb: 0.75 }}
				>
					{eyebrow}
				</Typography>
			)}

			<Typography variant='title' component='h1' sx={{ color: 'text.primary' }}>
				{title}
			</Typography>

			{subtitle && (
				<Typography
					variant='body2'
					sx={{
						mt: 1,
						color: 'text.secondary',
						maxWidth: 640,
						mx: isCentered ? 'auto' : 0,
					}}
				>
					{subtitle}
				</Typography>
			)}
		</Box>
	);
}

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface AssetlyLogoProps {
	size?: number;
	alt?: string;
}

export function AssetlyLogo({
	size = 40,
	alt = 'Assetly logo',
}: AssetlyLogoProps) {
	const theme = useTheme();
	const markColor = theme.palette.text.primary;
	const trendColor =
		theme.palette.mode === 'dark' ? '#34D399' : theme.palette.success.main;

	return (
		<Box
			component='svg'
			viewBox='0 0 64 64'
			role='img'
			aria-label={alt}
			sx={{
				width: size,
				height: size,
				display: 'block',
				flexShrink: 0,
			}}
		>
			<path
				fill={markColor}
				d='M32 8 12 56h9.2l4.2-10.4h13.2l-3.6-8.8h-5.9L32 25l13 31H54L34 8z'
			/>
			<path
				d='M24 40.5 31 32l6 4 9-12'
				fill='none'
				stroke={trendColor}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='5'
			/>
		</Box>
	);
}

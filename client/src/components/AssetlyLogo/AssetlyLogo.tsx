import { Box } from '@mui/material';

interface AssetlyLogoProps {
	size?: number;
	alt?: string;
}

export function AssetlyLogo({
	size = 40,
	alt = 'Assetly logo',
}: AssetlyLogoProps) {
	return (
		<Box
			component='img'
			src='/favicon.svg'
			alt={alt}
			sx={{
				width: size,
				height: size,
				display: 'block',
				flexShrink: 0,
			}}
		/>
	);
}

import { Stack, TextField, Typography } from '@mui/material';

interface SearchBarProps {
	caption: string;
	value: string;
	onChange: (value: string) => void;
}

export function SearchBar({ value, onChange, caption }: SearchBarProps) {
	return (
		<Stack spacing={1} sx={{ width: '100%' }}>
			<Typography
				variant='caption'
				component='label'
				htmlFor='asset-search'
				sx={{
					fontWeight: 700,
					letterSpacing: '0.05em',
					textTransform: 'uppercase',
					color: 'text.secondary',
				}}
			>
				{caption}
			</Typography>

			<TextField
				id='asset-search'
				type='text'
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder='Search by name, symbol, or type'
				autoComplete='off'
			/>
		</Stack>
	);
}

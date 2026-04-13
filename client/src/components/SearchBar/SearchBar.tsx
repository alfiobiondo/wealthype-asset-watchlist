import './SearchBar.css';

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
	return (
		<div className='search-bar'>
			<label className='search-bar__label' htmlFor='asset-search'>
				Search assets
			</label>

			<input
				id='asset-search'
				className='search-bar__input'
				type='text'
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder='Search by name, symbol, or type'
			/>
		</div>
	);
}

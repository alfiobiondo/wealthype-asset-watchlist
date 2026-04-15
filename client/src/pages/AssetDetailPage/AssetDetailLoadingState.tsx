import { CircularProgress } from '@mui/material';

export function AssetDetailLoadingState() {
	return (
		<section className='asset-detail-page__content'>
			<article className='asset-detail-card asset-detail-card--status'>
				<p className='asset-detail-card__eyebrow'>Asset details</p>
				<div className='asset-detail-page__loading' aria-live='polite'>
					<CircularProgress
						enableTrackSlot
						size={24}
						thickness={5.5}
						aria-label='Loading…'
						sx={(theme) => ({ color: theme.palette.brand.accentText })}
					/>
					<span>Loading asset details...</span>
				</div>
			</article>
		</section>
	);
}

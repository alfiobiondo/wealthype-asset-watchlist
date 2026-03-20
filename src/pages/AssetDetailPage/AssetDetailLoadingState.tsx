import { Spinner } from '../../components/Spinner/Spinner';

export function AssetDetailLoadingState() {
	return (
		<section className='asset-detail-page__content'>
			<article className='asset-detail-card asset-detail-card--status'>
				<p className='asset-detail-card__eyebrow'>Asset details</p>
				<div className='asset-detail-page__loading' aria-live='polite'>
					<Spinner />
					<span>Loading asset details...</span>
				</div>
			</article>
		</section>
	);
}

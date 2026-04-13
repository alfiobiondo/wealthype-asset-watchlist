export function AssetNotFoundState() {
	return (
		<section className='asset-detail-page__content'>
			<article className='asset-detail-card asset-detail-card--status'>
				<p className='asset-detail-card__eyebrow'>Asset details</p>
				<h1 className='asset-detail-card__title'>Asset not found</h1>
				<p className='asset-detail-card__description asset-detail-card__description--status'>
					The requested asset does not exist or is no longer available.
				</p>
			</article>
		</section>
	);
}

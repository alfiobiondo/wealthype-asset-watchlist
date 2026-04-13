import { ErrorState } from '../../components/ErrorState/ErrorState';

interface AssetDetailErrorStateProps {
	description: string;
	onRetry: () => void;
}

export function AssetDetailErrorState({
	description,
	onRetry,
}: AssetDetailErrorStateProps) {
	return (
		<section className='asset-detail-page__content'>
			<article className='asset-detail-card asset-detail-card--status'>
				<p className='asset-detail-card__eyebrow'>Asset details</p>

				<ErrorState
					title='Unable to load asset'
					description={description}
					onRetry={onRetry}
				/>
			</article>
		</section>
	);
}

import { useParams } from 'react-router-dom';
import { useAsset } from '../../features/assets/hooks/useAsset';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import { AssetNotFoundState } from './AssetNotFoundState';
import { AssetDetailLoadingState } from './AssetDetailLoadingState';
import { AssetDetailErrorState } from './AssetDetailErrorState';
import { AssetDetailPageShell } from './AssetDetailPageShell';
import './AssetDetailPage.css';

export function AssetDetailPage() {
	const { id = '' } = useParams();

	const { data: asset, isLoading, isError, error, refetch } = useAsset({ id });

	if (isLoading) {
		return (
			<AssetDetailPageShell>
				<AssetDetailLoadingState />
			</AssetDetailPageShell>
		);
	}

	if (isError) {
		return (
			<AssetDetailPageShell>
				<AssetDetailErrorState
					description={error instanceof Error ? error.message : 'Unknown error'}
					onRetry={refetch}
				/>
			</AssetDetailPageShell>
		);
	}

	if (!asset) {
		return (
			<AssetDetailPageShell>
				<AssetNotFoundState />
			</AssetDetailPageShell>
		);
	}

	const isPositive = asset.changePercent >= 0;

	return (
		<AssetDetailPageShell>
			<section className='asset-detail-page__content'>
				<article className='asset-detail-card'>
					<header className='asset-detail-card__header'>
						<div>
							<p className='asset-detail-card__symbol'>{asset.symbol}</p>
							<h1 className='asset-detail-card__title'>{asset.name}</h1>
						</div>

						<span className='asset-detail-card__type'>{asset.type}</span>
					</header>

					<div className='asset-detail-card__metrics'>
						<div className='asset-detail-card__metric'>
							<p className='asset-detail-card__label'>Current price</p>
							<p className='asset-detail-card__price'>
								{formatCurrency(asset.price)}
							</p>
						</div>

						<div className='asset-detail-card__metric'>
							<p className='asset-detail-card__label'>24h change</p>
							<p
								className={`asset-detail-card__change ${
									isPositive
										? 'asset-detail-card__change--positive'
										: 'asset-detail-card__change--negative'
								}`}
							>
								{formatPercentage(asset.changePercent)}
							</p>
						</div>
					</div>

					<div className='asset-detail-card__section'>
						<p className='asset-detail-card__label'>About this asset</p>
						<p className='asset-detail-card__description'>
							{asset.description}
						</p>
					</div>
				</article>
			</section>
		</AssetDetailPageShell>
	);
}

import type { Asset } from '../../features/assets/types';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import './AssetCard.css';

interface AssetCardProps {
	asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
	const isPositive = asset.changePercent >= 0;

	return (
		<article className='asset-card'>
			<div className='asset-card__header'>
				<div>
					<p className='asset-card__symbol'>{asset.symbol}</p>
					<h2 className='asset-card__name'>{asset.name}</h2>
				</div>

				<span className='asset-card__type'>{asset.type}</span>
			</div>

			<div className='asset-card__body'>
				<p className='asset-card__price'>{formatCurrency(asset.price)}</p>
				<p
					className={`asset-card__change ${
						isPositive
							? 'asset-card__change--positive'
							: 'asset-card__change--negative'
					}`}
				>
					{formatPercentage(asset.changePercent)}
				</p>
			</div>
		</article>
	);
}

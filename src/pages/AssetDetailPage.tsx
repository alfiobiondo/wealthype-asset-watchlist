import { Link, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { ErrorState } from '../components/ErrorState/ErrorState';
import { useAsset } from '../features/assets/hooks/useAsset';
import { formatCurrency, formatPercentage } from '../lib/formatters';

export function AssetDetailPage() {
	const { id = '' } = useParams();

	const { data: asset, isLoading, isError, error, refetch } = useAsset({ id });

	if (isLoading) {
		return (
			<main>
				<p>Loading asset details...</p>
			</main>
		);
	}

	if (isError) {
		return (
			<main>
				<ErrorState
					title='Unable to load asset'
					description={error instanceof Error ? error.message : 'Unknown error'}
					onRetry={() => refetch()}
				/>
			</main>
		);
	}

	if (!asset) {
		return (
			<main>
				<EmptyState
					title='Asset not found'
					description='The requested asset does not exist or is no longer available.'
				/>
				<p>
					<Link to='/'>Go back to dashboard</Link>
				</p>
			</main>
		);
	}

	const isPositive = asset.changePercent >= 0;

	return (
		<main>
			<p>
				<Link to='/'>← Back to dashboard</Link>
			</p>

			<section
				style={{
					display: 'block',
				}}
			>
				<article
					style={{
						maxWidth: '720px',
						background: 'white',
						borderRadius: '16px',
						padding: '24px',
						border: '1px solid #e5e7eb',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
					}}
				>
					<p>{asset.symbol}</p>
					<h1>{asset.name}</h1>
					<p>{asset.type}</p>
					<p>{formatCurrency(asset.price)}</p>
					<p style={{ color: isPositive ? '#15803d' : '#b91c1c' }}>
						{formatPercentage(asset.changePercent)}
					</p>
					<p>{asset.description}</p>
				</article>
			</section>
		</main>
	);
}

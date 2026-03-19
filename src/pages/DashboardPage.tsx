import { AssetCard } from '../components/AssetCard/AssetCard';
import { mockAssets } from '../mocks/assets';

export function DashboardPage() {
	return (
		<main>
			<h1>Asset Watchlist</h1>

			<section>
				{mockAssets.map((asset) => (
					<AssetCard key={asset.id} asset={asset} />
				))}
			</section>
		</main>
	);
}

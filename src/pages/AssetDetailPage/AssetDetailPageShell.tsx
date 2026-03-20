import type { ReactNode } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { AssetDetailBackButton } from './AssetDetailBackButton';

interface AssetDetailPageShellProps {
	children: ReactNode;
}

export function AssetDetailPageShell({ children }: AssetDetailPageShellProps) {
	return (
		<main className='asset-detail-page'>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<PageHeader
					eyebrow='Wealthype'
					title='Asset details'
					subtitle='View price, performance and additional information.'
				/>

				<AssetDetailBackButton />
			</div>

			{children}
		</main>
	);
}

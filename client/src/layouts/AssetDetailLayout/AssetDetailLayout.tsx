import type { ReactNode } from 'react';
import { PageLayout } from '../PageLayout/PageLayout';

interface AssetDetailPageShellProps {
	children: ReactNode;
}

export function AssetDetailLayout({ children }: AssetDetailPageShellProps) {
	return (
		<PageLayout
			eyebrow='Wealthype'
			title='Asset details'
			subtitle='View price, performance and additional information.'
			backLink={{ to: '/', label: 'Back to dashboard' }}
		>
			{children}
		</PageLayout>
	);
}

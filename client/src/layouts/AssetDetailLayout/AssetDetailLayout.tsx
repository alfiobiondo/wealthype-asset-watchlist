import type { ReactNode } from 'react';
import { PageLayout } from '../PageLayout/PageLayout';

interface AssetDetailLayoutProps {
	children: ReactNode;
}

export function AssetDetailLayout({ children }: AssetDetailLayoutProps) {
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

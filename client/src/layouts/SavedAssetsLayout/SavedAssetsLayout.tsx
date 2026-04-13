import type { ReactNode } from 'react';
import { PageLayout } from '../PageLayout/PageLayout';

interface SavedAssetsLayoutProps {
	children: ReactNode;
}

export function SavedAssetsLayout({ children }: SavedAssetsLayoutProps) {
	return (
		<PageLayout
			eyebrow='Wealthype'
			title='Saved assets'
			subtitle='Track the assets you added to your watchlist.'
			backLink={{ to: '/', label: 'Back to dashboard' }}
		>
			{children}
		</PageLayout>
	);
}

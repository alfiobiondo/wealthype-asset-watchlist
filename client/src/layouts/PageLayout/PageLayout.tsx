import type { ReactNode } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageBackLink } from '../../components/PageBackLink/PageBackLink';
import './PageLayout.css';

interface PageLayoutProps {
	eyebrow: string;
	title: string;
	subtitle: string;
	children: ReactNode;
	backLink?: {
		to: string;
		label: string;
	};
	className?: string;
}

export function PageLayout({
	eyebrow,
	title,
	subtitle,
	children,
	backLink,
	className = '',
}: PageLayoutProps) {
	return (
		<main className={`page-layout ${className}`.trim()}>
			<div className='page-layout__intro'>
				<PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

				{backLink ? (
					<PageBackLink to={backLink.to} label={backLink.label} />
				) : null}
			</div>

			<div className='page-layout__content'>{children}</div>
		</main>
	);
}

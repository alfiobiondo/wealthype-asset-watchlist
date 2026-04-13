import './PageHeader.css';

interface PageHeaderProps {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	align?: 'left' | 'center';
}

export function PageHeader({
	eyebrow,
	title,
	subtitle,
	align = 'left',
}: PageHeaderProps) {
	return (
		<header className={`page-header page-header--${align}`}>
			{eyebrow && <p className='page-header__eyebrow'>{eyebrow}</p>}
			<h1 className='page-header__title'>{title}</h1>
			{subtitle && <p className='page-header__subtitle'>{subtitle}</p>}
		</header>
	);
}

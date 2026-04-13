import { Link } from 'react-router-dom';
import './PageBackLink.css';

interface PageBackLinkProps {
	to: string;
	label: string;
}

export function PageBackLink({ to, label }: PageBackLinkProps) {
	return (
		<p className='page-back-link__wrapper'>
			<Link to={to} className='page-back-link'>
				<span className='page-back-link__icon' aria-hidden='true'>
					←
				</span>
				<span>{label}</span>
			</Link>
		</p>
	);
}

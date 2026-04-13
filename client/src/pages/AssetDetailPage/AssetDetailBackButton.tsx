import { Link } from 'react-router-dom';

export function AssetDetailBackButton() {
	return (
		<p className='asset-detail-page__back-wrapper'>
			<Link to='/' className='asset-detail-page__back-button'>
				<span className='asset-detail-page__back-icon'>←</span>
				Back to dashboard
			</Link>
		</p>
	);
}

import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export function NotFoundPage() {
	return (
		<main className='not-found-page'>
			<section className='not-found-page__card'>
				<p className='not-found-page__eyebrow'>404 error</p>

				<h1 className='not-found-page__title'>Page not found</h1>

				<p className='not-found-page__description'>
					The page you are looking for does not exist or may have been moved.
				</p>

				<Link to='/' className='not-found-page__action'>
					Back to dashboard
				</Link>
			</section>
		</main>
	);
}

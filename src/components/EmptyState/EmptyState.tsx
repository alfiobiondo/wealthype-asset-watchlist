import './EmptyState.css';

interface EmptyStateProps {
	title: string;
	description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
	return (
		<div className='empty-state' role='status' aria-live='polite'>
			<h2 className='empty-state__title'>{title}</h2>
			<p className='empty-state__description'>{description}</p>
		</div>
	);
}

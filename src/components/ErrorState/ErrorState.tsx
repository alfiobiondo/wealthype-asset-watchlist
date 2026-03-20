import './ErrorState.css';

interface ErrorStateProps {
	title: string;
	description: string;
	onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
	return (
		<div className='error-state' role='alert'>
			<h2 className='error-state__title'>{title}</h2>
			<p className='error-state__description'>{description}</p>

			{onRetry && (
				<button type='button' className='error-state__button' onClick={onRetry}>
					Retry
				</button>
			)}
		</div>
	);
}

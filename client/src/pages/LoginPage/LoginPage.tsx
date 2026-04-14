import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import './LoginPage.css';

export function LoginPage() {
	const { login, isLoading, error } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		login({ email, password });
	}

	return (
		<div className='auth-page'>
			<div className='auth-page__shell'>
				<div className='auth-page__brand'>
					<div className='auth-page__brand-mark'>W</div>
					<div>
						<p className='auth-page__eyebrow'>Wealthype</p>
						<h1 className='auth-page__title'>Welcome back</h1>
						<p className='auth-page__subtitle'>
							Log in to access your dashboard and personal watchlist.
						</p>
					</div>
				</div>

				<form className='auth-card' onSubmit={handleSubmit}>
					<div className='auth-card__header'>
						<h2 className='auth-card__title'>Log in</h2>
						<p className='auth-card__description'>
							Use your credentials to continue.
						</p>
					</div>

					<div className='auth-card__fields'>
						<label className='auth-card__field'>
							<span>Email</span>
							<input
								type='email'
								placeholder='you@example.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>

						<label className='auth-card__field'>
							<span>Password</span>
							<input
								type='password'
								placeholder='Your password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
					</div>

					<button
						className='auth-card__submit'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? 'Logging in...' : 'Log in'}
					</button>

					{error ? (
						<p className='auth-card__error'>
							{error instanceof Error ? error.message : 'Login failed'}
						</p>
					) : null}

					<p className='auth-card__switch'>
						Don&apos;t have an account? <Link to='/signup'>Create one</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

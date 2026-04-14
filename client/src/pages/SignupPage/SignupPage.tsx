import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import '../LoginPage/LoginPage.css';
import { Spinner } from '../../components/Spinner/Spinner';

export function SignupPage() {
	const { signup, isLoading, error } = useAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		signup({ name, email, password });
	}

	return (
		<div className='auth-page'>
			<div className='auth-page__shell'>
				<div className='auth-page__brand'>
					<div className='auth-page__brand-mark'>W</div>
					<div>
						<p className='auth-page__eyebrow'>Wealthype</p>
						<h1 className='auth-page__title'>Create your account</h1>
						<p className='auth-page__subtitle'>
							Start tracking your saved assets with a personal watchlist.
						</p>
					</div>
				</div>

				<form className='auth-card' onSubmit={handleSubmit}>
					<div className='auth-card__header'>
						<h2 className='auth-card__title'>Sign up</h2>
						<p className='auth-card__description'>
							Create an account to save and manage your watchlist.
						</p>
					</div>

					<div className='auth-card__fields'>
						<label className='auth-card__field'>
							<span>Name</span>
							<input
								type='text'
								placeholder='Your name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</label>

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
								placeholder='At least 6 characters'
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
						{isLoading ? (
							<span className='auth-card__submit-content'>
								<Spinner />
								<span>Creating account...</span>
							</span>
						) : (
							'Create account'
						)}
					</button>

					{error ? (
						<p className='auth-card__error'>
							{error instanceof Error ? error.message : 'Signup failed'}
						</p>
					) : null}

					<p className='auth-card__switch'>
						Already have an account? <Link to='/login'>Log in</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

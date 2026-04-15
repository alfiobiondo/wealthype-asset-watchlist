import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	Button,
	CircularProgress,
	Link,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { AuthLayout } from '../../layouts/AuthLayout/AuthLayout';

export function LoginPage() {
	const { login, isLoading, error } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		login({
			email: email.trim(),
			password,
		});
	}

	return (
		<AuthLayout
			title='Welcome back'
			subtitle='Log in to access your dashboard and personal watchlist.'
			card={
				<Box component='form' onSubmit={handleSubmit}>
					<Stack spacing={3}>
						<Stack spacing={1}>
							<Typography variant='h3' component='h2'>
								Log in
							</Typography>

							<Typography variant='body2' sx={{ color: 'text.secondary' }}>
								Use your credentials to continue.
							</Typography>
						</Stack>

						<Stack spacing={2}>
							<Stack spacing={1}>
								<Typography
									variant='body2'
									component='label'
									htmlFor='login-email'
									sx={{ fontWeight: 600, color: 'text.primary' }}
								>
									Email
								</Typography>

								<TextField
									id='login-email'
									type='email'
									placeholder='you@example.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete='email'
									required
								/>
							</Stack>

							<Stack spacing={1}>
								<Typography
									variant='body2'
									component='label'
									htmlFor='login-password'
									sx={{ fontWeight: 600, color: 'text.primary' }}
								>
									Password
								</Typography>

								<TextField
									id='login-password'
									type='password'
									placeholder='Your password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete='current-password'
									required
								/>
							</Stack>
						</Stack>

						<Button
							type='submit'
							variant='soft'
							disabled={isLoading || !email.trim() || !password}
							fullWidth
						>
							{isLoading ? (
								<Box className='auth-card__submit-content'>
									<CircularProgress
										enableTrackSlot
										size={24}
										thickness={5.5}
										aria-label='Loading…'
										sx={(theme) => ({ color: theme.palette.brand.accentText })}
									/>
									<span>Logging in...</span>
								</Box>
							) : (
								'Log in'
							)}
						</Button>

						{error ? (
							<Typography
								variant='body2'
								aria-live='polite'
								sx={{ color: 'error.main' }}
							>
								{error instanceof Error ? error.message : 'Login failed'}
							</Typography>
						) : null}

						<Typography variant='body2' sx={{ color: 'text.secondary' }}>
							Don&apos;t have an account?{' '}
							<Link
								component={RouterLink}
								to='/signup'
								underline='hover'
								sx={{ fontWeight: 600 }}
							>
								Create one
							</Link>
						</Typography>
					</Stack>
				</Box>
			}
		/>
	);
}

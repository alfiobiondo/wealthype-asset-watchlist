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

export function SignupPage() {
	const { signup, isLoading, error } = useAuth();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		signup({
			name: name.trim(),
			email: email.trim(),
			password,
		});
	}

	return (
		<AuthLayout
			title='Create your account'
			subtitle='Start tracking your saved assets with a personal watchlist.'
			card={
				<Box component='form' onSubmit={handleSubmit}>
					<Stack spacing={3}>
						<Stack spacing={1}>
							<Typography variant='h3' component='h2'>
								Sign up
							</Typography>

							<Typography variant='body2' sx={{ color: 'text.secondary' }}>
								Create an account to save and manage your watchlist.
							</Typography>
						</Stack>

						<Stack spacing={2}>
							<Stack spacing={1}>
								<Typography
									variant='body2'
									component='label'
									htmlFor='signup-name'
									sx={{ fontWeight: 600, color: 'text.primary' }}
								>
									Name
								</Typography>

								<TextField
									id='signup-name'
									type='text'
									placeholder='Your name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									autoComplete='name'
									required
								/>
							</Stack>

							<Stack spacing={1}>
								<Typography
									variant='body2'
									component='label'
									htmlFor='signup-email'
									sx={{ fontWeight: 600, color: 'text.primary' }}
								>
									Email
								</Typography>

								<TextField
									id='signup-email'
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
									htmlFor='signup-password'
									sx={{ fontWeight: 600, color: 'text.primary' }}
								>
									Password
								</Typography>

								<TextField
									id='signup-password'
									type='password'
									placeholder='At least 6 characters'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									autoComplete='new-password'
									required
								/>
							</Stack>
						</Stack>

						<Button
							type='submit'
							variant='soft'
							disabled={
								isLoading ||
								!name.trim() ||
								!email.trim() ||
								password.length < 6
							}
							fullWidth
						>
							{isLoading ? (
								<Stack
									direction='row'
									spacing={1}
									sx={{ alignItems: 'center', justifyContent: 'center' }}
								>
									<CircularProgress
										enableTrackSlot
										size={24}
										thickness={5.5}
										aria-label='Loading…'
										sx={(theme) => ({ color: theme.palette.brand.accentText })}
									/>
									<span>Creating account...</span>
								</Stack>
							) : (
								'Create account'
							)}
						</Button>

						{error ? (
							<Typography
								variant='body2'
								aria-live='polite'
								sx={{ color: 'error.main' }}
							>
								{error instanceof Error ? error.message : 'Signup failed'}
							</Typography>
						) : null}

						<Typography variant='body2' sx={{ color: 'text.secondary' }}>
							Already have an account?{' '}
							<Link
								component={RouterLink}
								to='/login'
								underline='hover'
								sx={{ fontWeight: 600 }}
							>
								Log in
							</Link>
						</Typography>
					</Stack>
				</Box>
			}
		/>
	);
}

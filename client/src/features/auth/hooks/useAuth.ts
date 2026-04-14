import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../api/auth';
import { removeToken, setToken } from '../lib/authStorage';

export function useAuth() {
	const navigate = useNavigate();

	const loginMutation = useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			login(email, password),
		onSuccess: (data) => {
			setToken(data.token);
			navigate('/');
		},
	});

	const signupMutation = useMutation({
		mutationFn: ({
			email,
			password,
			name,
		}: {
			email: string;
			password: string;
			name?: string;
		}) => signup(email, password, name),
		onSuccess: (data) => {
			setToken(data.token);
			navigate('/');
		},
	});

	function logout() {
		removeToken();
		navigate('/login');
	}

	return {
		login: loginMutation.mutate,
		signup: signupMutation.mutate,
		logout,
		isLoading: loginMutation.isPending || signupMutation.isPending,
		error: loginMutation.error ?? signupMutation.error ?? null,
	};
}

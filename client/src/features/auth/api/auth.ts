import { ENV } from '../../../config/env';

interface AuthResponse {
	token: string;
	user: {
		id: string;
		email: string;
		name: string | null;
	};
}

export async function login(
	email: string,
	password: string
): Promise<AuthResponse> {
	const response = await fetch(`${ENV.API_BASE_URL}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => null);
		throw new Error(error?.message ?? 'Login failed');
	}

	return response.json();
}

export async function signup(
	email: string,
	password: string,
	name?: string
): Promise<AuthResponse> {
	const response = await fetch(`${ENV.API_BASE_URL}/api/auth/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, name }),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => null);
		throw new Error(error?.message ?? 'Signup failed');
	}

	return response.json();
}

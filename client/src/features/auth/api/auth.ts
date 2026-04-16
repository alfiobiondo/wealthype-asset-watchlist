import { apiClient } from '../../../lib/apiClient';

export interface AuthUser {
	id: string;
	email: string;
	name: string | null;
}

export interface AuthResponse {
	token: string;
	user: AuthUser;
}

export interface CurrentUserResponse {
	user: AuthUser;
}

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

export async function login(
	email: string,
	password: string
): Promise<AuthResponse> {
	const response = await apiClient('/api/auth/login', {
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
	const response = await apiClient('/api/auth/signup', {
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

export async function getCurrentUser(): Promise<CurrentUserResponse> {
	const response = await apiClient('/api/auth/me');

	if (!response.ok) {
		const error = await response.json().catch(() => null);

		throw new ApiError(
			error?.message ?? 'Failed to fetch current user',
			response.status
		);
	}

	return response.json();
}

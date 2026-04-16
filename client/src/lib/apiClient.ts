import { ENV } from '../config/env';
import { getToken } from '../features/auth/lib/authStorage';

export async function apiClient(input: string, init?: RequestInit) {
	const token = getToken();

	const headers = new Headers(init?.headers);

	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	if (!headers.has('Content-Type') && init?.body) {
		headers.set('Content-Type', 'application/json');
	}

	const url = input.startsWith('http') ? input : `${ENV.API_BASE_URL}${input}`;

	return fetch(url, {
		...init,
		headers,
	});
}

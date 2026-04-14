import { getToken } from '../features/auth/lib/authStorage';

export async function apiClient(input: RequestInfo, init?: RequestInit) {
	const token = getToken();

	const headers = new Headers(init?.headers);

	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	return fetch(input, {
		...init,
		headers,
	});
}

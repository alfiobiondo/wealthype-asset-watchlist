import { getToken } from '../lib/authStorage';
import { decodeToken } from '../lib/decodeToken';

export function useCurrentUser() {
	const token = getToken();

	if (!token) return null;

	const payload = decodeToken(token);

	return payload;
}

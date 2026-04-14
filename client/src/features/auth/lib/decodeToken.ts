export interface AuthPayload {
	userId: string;
	exp: number;
	iat: number;
}

export function decodeToken(token: string): AuthPayload | null {
	try {
		const payload = token.split('.')[1];
		const decoded = atob(payload);
		return JSON.parse(decoded);
	} catch {
		return null;
	}
}

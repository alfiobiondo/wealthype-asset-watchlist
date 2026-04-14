export interface AuthUser {
	id: string;
	email: string;
	name: string | null;
}

export interface AuthResponse {
	token: string;
	user: AuthUser;
}

export interface SignupInput {
	email: string;
	password: string;
	name?: string;
}

export interface LoginInput {
	email: string;
	password: string;
}

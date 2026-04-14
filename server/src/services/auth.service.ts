import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import type {
	AuthResponse,
	AuthUser,
	LoginInput,
	SignupInput,
} from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined');
}

const JWT_SECRET_STR: string = JWT_SECRET;

function mapAuthUser(user: {
	id: string;
	email: string;
	name: string | null;
}): AuthUser {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
	};
}

function createToken(userId: string): string {
	return jwt.sign({ userId }, JWT_SECRET_STR, {
		expiresIn: '7d',
	});
}

export async function signup(input: SignupInput): Promise<AuthResponse> {
	const email = input.email.trim().toLowerCase();
	const password = input.password.trim();
	const name = input.name?.trim() || null;

	if (!email) {
		throw new Error('Email is required');
	}

	if (!password) {
		throw new Error('Password is required');
	}

	if (password.length < 6) {
		throw new Error('Password must be at least 6 characters long');
	}

	const existingUser = await prisma.user.findUnique({
		where: { email },
	});

	if (existingUser) {
		throw new Error('A user with this email already exists');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email,
			passwordHash,
			name,
		},
		select: {
			id: true,
			email: true,
			name: true,
		},
	});

	return {
		token: createToken(user.id),
		user: mapAuthUser(user),
	};
}

export async function login(input: LoginInput): Promise<AuthResponse> {
	const email = input.email.trim().toLowerCase();
	const password = input.password.trim();

	if (!email) {
		throw new Error('Email is required');
	}

	if (!password) {
		throw new Error('Password is required');
	}

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		throw new Error('Invalid email or password');
	}

	const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

	if (!isPasswordValid) {
		throw new Error('Invalid email or password');
	}

	return {
		token: createToken(user.id),
		user: mapAuthUser(user),
	};
}

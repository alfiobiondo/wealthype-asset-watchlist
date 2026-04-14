import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined');
}

const JWT_SECRET_STR: string = JWT_SECRET;

interface JwtPayload {
	userId: string;
}

declare global {
	namespace Express {
		interface Request {
			auth?: {
				userId: string;
			};
		}
	}
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const authorization = req.headers.authorization;

	if (!authorization || !authorization.startsWith('Bearer ')) {
		return res.status(401).json({
			message: 'Authorization token is missing or invalid',
		});
	}

	const token = authorization.replace('Bearer ', '').trim();

	try {
		const decoded = jwt.verify(token, JWT_SECRET_STR);

		if (typeof decoded === 'string' || !('userId' in decoded)) {
			return res.status(401).json({
				message: 'Invalid token payload',
			});
		}

		req.auth = {
			userId: decoded.userId,
		};

		next();
	} catch {
		return res.status(401).json({
			message: 'Invalid or expired token',
		});
	}
}

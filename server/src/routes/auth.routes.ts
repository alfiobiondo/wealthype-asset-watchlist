import { Router } from 'express';
import { login, signup } from '../services/auth.service';

export const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
	try {
		const { email, password, name } = req.body;

		const result = await signup({ email, password, name });

		res.status(201).json(result);
	} catch (error) {
		res.status(400).json({
			message: error instanceof Error ? error.message : 'Failed to sign up',
		});
	}
});

authRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const result = await login({ email, password });

		res.status(200).json(result);
	} catch (error) {
		res.status(401).json({
			message: error instanceof Error ? error.message : 'Failed to log in',
		});
	}
});

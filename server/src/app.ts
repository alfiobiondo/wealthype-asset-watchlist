import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { assetsRouter } from './routes/assets.routes';
import { assetTypesRouter } from './routes/types.routes';
import { watchlistRouter } from './routes/watchlist.routes';
import { authRouter } from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.disable('x-powered-by');

if (process.env.TRUST_PROXY === 'true') {
	app.set('trust proxy', 1);
}

const allowedOrigins = [
	'http://localhost:5173',
	process.env.CORS_ORIGIN,
].filter(Boolean) as string[];

app.use(helmet());

app.use(
	cors({
		origin(origin, callback) {
			if (!origin) {
				return callback(null, true);
			}

			if (allowedOrigins.includes(origin)) {
				return callback(null, true);
			}

			return callback(new Error('Origin not allowed by CORS'));
		},
	}),
);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (_req, res) => {
	res.status(200).json({ status: 'ok' });
});

app.use('/api/assets', assetsRouter);
app.use('/api/asset-types', assetTypesRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);

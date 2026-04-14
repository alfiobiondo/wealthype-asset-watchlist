import express from 'express';
import cors from 'cors';
import { assetsRouter } from './routes/assets.routes';
import { assetTypesRouter } from './routes/types.routes';
import { watchlistRouter } from './routes/watchlist.routes';
import { authRouter } from './routes/auth.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
	res.status(200).json({ status: 'ok' });
});

app.use('/api/assets', assetsRouter);
app.use('/api/asset', assetsRouter);
app.use('/api/asset-types', assetTypesRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/auth', authRouter);

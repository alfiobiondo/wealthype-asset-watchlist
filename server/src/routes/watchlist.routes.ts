import { Router } from 'express';
import {
	addToWatchlist,
	getWatchlist,
	removeFromWatchlist,
} from '../services/watchlist.service';

export const watchlistRouter = Router();

watchlistRouter.get('/', async (_req, res) => {
	const data = await getWatchlist();
	res.status(200).json(data);
});

watchlistRouter.post('/:assetId', async (req, res) => {
	const { assetId } = req.params;

	const result = await addToWatchlist(assetId);

	if (!result.success) {
		return res.status(result.status).json({ message: result.message });
	}

	res.status(200).json(result.data);
});

watchlistRouter.delete('/:assetId', async (req, res) => {
	const { assetId } = req.params;

	const result = await removeFromWatchlist(assetId);

	if (!result.success) {
		return res.status(result.status).json({ message: result.message });
	}

	res.status(200).json(result.data);
});

import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import {
	addToWatchlist,
	getWatchlist,
	removeFromWatchlist,
} from '../services/watchlist.service';

export const watchlistRouter = Router();

watchlistRouter.use(requireAuth);

watchlistRouter.get('/', async (req, res) => {
	const userId = req.auth!.userId;
	const data = await getWatchlist(userId);
	res.status(200).json(data);
});

watchlistRouter.post('/:assetId', async (req, res) => {
	const userId = req.auth!.userId;
	const { assetId } = req.params;

	const result = await addToWatchlist(userId, assetId);

	if (!result.success) {
		return res.status(result.status).json({ message: result.message });
	}

	res.status(200).json(result.data);
});

watchlistRouter.delete('/:assetId', async (req, res) => {
	const userId = req.auth!.userId;
	const { assetId } = req.params;

	const result = await removeFromWatchlist(userId, assetId);

	if (!result.success) {
		return res.status(result.status).json({ message: result.message });
	}

	res.status(200).json(result.data);
});

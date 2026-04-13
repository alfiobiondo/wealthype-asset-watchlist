import { Router } from 'express';
import {
	addToWatchlist,
	getWatchlist,
	removeFromWatchlist,
} from '../services/watchlist.service';

export const watchlistRouter = Router();

watchlistRouter.get('/', (_req, res) => {
	const data = getWatchlist();
	res.status(200).json(data);
});

watchlistRouter.post('/:assetId', (req, res) => {
	const { assetId } = req.params;

	const result = addToWatchlist(assetId);

	if (!result.success) {
		return res.status(result.status).json({ message: result.message });
	}

	res.status(200).json(result.data);
});

watchlistRouter.delete('/:assetId', (req, res) => {
	const { assetId } = req.params;

	const result = removeFromWatchlist(assetId);

	if (!result.success) {
		return res.status(result.status).json({ message: result.message });
	}

	res.status(200).json(result.data);
});

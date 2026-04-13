import { Router } from 'express';
import { getAssetById, getAssets } from '../services/assets.service';

export const assetsRouter = Router();

assetsRouter.get('/', (req, res) => {
	const search =
		typeof req.query.search === 'string'
			? req.query.search
			: typeof req.query.q === 'string'
			? req.query.q
			: undefined;

	const type = typeof req.query.type === 'string' ? req.query.type : undefined;

	const result = getAssets({ search, type });

	res.status(200).json(result);
});

assetsRouter.get('/:id', (req, res) => {
	const { id } = req.params;

	const asset = getAssetById(id);

	if (!asset) {
		return res.status(404).json({
			message: `Asset with id "${id}" not found.`,
		});
	}

	res.status(200).json(asset);
});

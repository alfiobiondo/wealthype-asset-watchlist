import { Router } from 'express';
import { getAssetTypes } from '../services/assets.service';

export const assetTypesRouter = Router();

assetTypesRouter.get('/', async (_req, res) => {
	const types = await getAssetTypes();

	res.status(200).json(types);
});

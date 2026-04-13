import { Router } from 'express';
import { getAssetTypes } from '../services/assets.service';

export const assetTypesRouter = Router();

assetTypesRouter.get('/', (_req, res) => {
	const types = getAssetTypes();

	res.status(200).json(types);
});

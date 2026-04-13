import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout/AppLayout';
import { RootLayout } from '../layouts/RootLayout/RootLayout';
import { AssetDetailPage } from '../pages/AssetDetailPage/AssetDetailPage';
import { DashboardPage } from '../pages/DashboardPage/DashboardPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { SavedAssetsPage } from '../pages/SavedAssetsPage/SavedAssetsPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				element: <AppLayout />,
				children: [
					{
						index: true,
						element: <DashboardPage />,
					},
					{
						path: 'saved',
						element: <SavedAssetsPage />,
					},
				],
			},
			{
				path: 'asset/:id',
				element: <AssetDetailPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);

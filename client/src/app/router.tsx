import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout/AppLayout';
import { RootLayout } from '../layouts/RootLayout/RootLayout';
import { AssetDetailPage } from '../pages/AssetDetailPage/AssetDetailPage';
import { DashboardPage } from '../pages/DashboardPage/DashboardPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { SavedAssetsPage } from '../pages/SavedAssetsPage/SavedAssetsPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { SignupPage } from '../pages/SignupPage/SignupPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'signup',
				element: <SignupPage />,
			},
			{
				element: (
					<ProtectedRoute>
						<AppLayout />
					</ProtectedRoute>
				),
				children: [
					{
						index: true,
						element: <DashboardPage />,
					},
					{
						path: 'saved',
						element: <SavedAssetsPage />,
					},
					{
						path: 'asset/:id',
						element: <AssetDetailPage />,
					},
				],
			},

			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);

import type { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PageBackLink } from '../../components/PageBackLink/PageBackLink';

interface PageLayoutProps {
	eyebrow: string;
	title: string;
	subtitle: string;
	children: ReactNode;
	backLink?: {
		to: string;
		label: string;
	};
	className?: string;
}

export function PageLayout({
	eyebrow,
	title,
	subtitle,
	children,
	backLink,
	className,
}: PageLayoutProps) {
	return (
		<Box
			component='main'
			className={className}
			sx={(theme) => ({
				maxWidth: theme.tokens.layout.pageMaxWidth,
				width: '100%',
				mx: 'auto',
				minHeight: '100vh',
				px: { xs: 2.5, md: 8 },
				py: { xs: 3, md: 4, lg: 6 },
				backgroundColor: theme.palette.background.default,
			})}
		>
			<Stack
				spacing={3}
				sx={{
					mb: 3,
				}}
			>
				<PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

				{backLink ? (
					<PageBackLink to={backLink.to} label={backLink.label} />
				) : null}
			</Stack>

			<Stack spacing={3}>{children}</Stack>
		</Box>
	);
}

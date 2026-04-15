import '@mui/material/styles';
import '@mui/material/Button';

declare module '@mui/material/styles' {
	interface Palette {
		brand: {
			primary: string;
			primaryHover: string;
			accent: string;
			accentStrong: string;
			accentText: string;
			accentLink: string;
			accentSoft: string;
			accentSoftHover: string;
			accentHover: string;
			accentBorder: string;
			contrast: string;
		};
		surface: {
			primary: string;
			secondary: string;
			tertiary: string;
			inverse: string;
		};
		border: {
			default: string;
			muted: string;
			strong: string;
			soft: string;
			accent: string;
			accentHover: string;
			dangerSoft: string;
			dashed: string;
		};
		feedback: {
			success: string;
			danger: string;
			dangerStrong: string;
			dangerText: string;
			dangerSoft: string;
			dangerSofter: string;
			dangerBorder: string;
			dangerFocus: string;
			dangerAccent: string;
		};
		focus: {
			ring: string;
		};
	}

	interface PaletteOptions {
		brand?: {
			primary: string;
			primaryHover: string;
			accent: string;
			accentStrong: string;
			accentText: string;
			accentLink: string;
			accentSoft: string;
			accentSoftHover: string;
			accentHover: string;
			accentBorder: string;
			contrast: string;
		};
		surface?: {
			primary: string;
			secondary: string;
			tertiary: string;
			inverse: string;
		};
		border?: {
			default: string;
			muted: string;
			strong: string;
			soft: string;
			accent: string;
			accentHover: string;
			dangerSoft: string;
			dashed: string;
		};
		feedback?: {
			success: string;
			danger: string;
			dangerStrong: string;
			dangerText: string;
			dangerSoft: string;
			dangerSofter: string;
			dangerBorder: string;
			dangerFocus: string;
			dangerAccent: string;
		};
		focus?: {
			ring: string;
		};
	}

	interface Theme {
		tokens: {
			radius: {
				sm: string;
				md: string;
				lg: string;
				xl: string;
				pill: string;
			};
			spacing: {
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				'2xl': string;
				'3xl': string;
			};
			shadows: {
				sm: string;
				md: string;
				lg: string;
				xl: string;
				floating: string;
			};
			gradients: {
				brand: string;
			};
		};
	}

	interface ThemeOptions {
		tokens?: {
			radius?: {
				sm: string;
				md: string;
				lg: string;
				xl: string;
				pill: string;
			};
			spacing?: {
				xs: string;
				sm: string;
				md: string;
				lg: string;
				xl: string;
				'2xl': string;
				'3xl': string;
			};
			shadows?: {
				sm: string;
				md: string;
				lg: string;
				xl: string;
				floating: string;
			};
			gradients?: {
				brand: string;
			};
		};
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		soft: true;
	}
}

export const colors = {
	bg: {
		app: '#f9fafb',
		subtle: '#f6f7fb',
		muted: '#f8fafc',
	},

	surface: {
		primary: '#ffffff',
		secondary: '#f8fafc',
		tertiary: '#f3f4f6',
		inverse: '#111827',
	},

	text: {
		primary: '#111827',
		secondary: '#4b5563',
		tertiary: '#374151',
		muted: '#6b7280',
		subtle: '#7b8190',
		strong: '#1f2937',
		accent: '#334155',
		inverse: '#ffffff',
	},

	border: {
		default: '#e5e7eb',
		muted: '#dbe1e7',
		strong: '#d1d5db',
		soft: '#dfe3eb',
		accent: '#cfd6e4',
		accentHover: '#bfc9e6',
		dangerSoft: '#f3b5b5',
		dashed: '#cbd5e1',
	},

	brand: {
		primary: '#111827',
		primaryHover: '#1f2937',
		accent: '#4338ca',
		accentStrong: '#4f46e5',
		accentText: '#1d4ed8',
		accentLink: '#2c50d3',
		accentSoft: '#eef2ff',
		accentSoftHover: '#e5ebff',
		accentHover: '#dbeafe',
		accentBorder: '#bfdbfe',
	},

	feedback: {
		success: '#15803d',
		danger: '#b91c1c',
		dangerStrong: '#991b1b',
		dangerText: '#7f1d1d',
		dangerSoft: '#fff7f7',
		dangerSofter: '#fef2f2',
		dangerBorder: '#fecaca',
		dangerFocus: '#fca5a5',
		dangerAccent: '#dc2626',
	},

	focus: {
		ring: '#93c5fd',
	},

	badge: {
		neutralBg: '#e2e8f0',
		neutralText: '#1e293b',
	},

	skeleton: {
		base: '#e5e7eb',
		highlight: '#f3f4f6',
	},

	gradient: {
		brand: 'linear-gradient(135deg, #111827 0%, #334155 100%)',
	},
} as const;

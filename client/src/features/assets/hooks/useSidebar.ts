import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sidebar:open';

export function useSidebar() {
	const [isOpen, setIsOpen] = useState<boolean>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : true; // default open
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(isOpen));
	}, [isOpen]);

	function toggle() {
		setIsOpen((prev) => !prev);
	}

	function open() {
		setIsOpen(true);
	}

	function close() {
		setIsOpen(false);
	}

	return {
		isOpen,
		toggle,
		open,
		close,
	};
}

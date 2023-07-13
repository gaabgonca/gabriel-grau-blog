import { writable } from 'svelte/store';

export const menuInitialized = writable(false);

export const titleElements = writable([]);

export const listMode = writable(false);

export const listTitleElements = writable([]);

export const listInitialized = writable(false);

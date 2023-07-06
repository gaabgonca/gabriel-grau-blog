import { writable } from 'svelte/store';

export const menuInitialized = writable(false);

export const titleElements = writable([])
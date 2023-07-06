export const ssr = false;
export const csr = true;

import { error } from '@sveltejs/kit';
import { titles as pieces } from '../../../data/pieces';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	let piece = pieces.find((piece) => piece.slug === params.slug);

	return piece;
	throw error(404, 'Not found');
}

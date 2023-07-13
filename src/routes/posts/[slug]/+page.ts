export const ssr = false;
export const csr = true;

import { error } from '@sveltejs/kit';
import { titles as pieces } from '../../../data/pieces';

/** @type {import('./$types').PageLoad} */
export function load({ params, url }) {
	try {
		const piece = pieces.find((piece) => piece.slug === params.slug);
		const isList = url.searchParams.get('list') !== null;
		return { piece, isList };
	} catch (e) {
		throw error(404, 'Not found');
	}
}

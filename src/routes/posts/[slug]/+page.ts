export const ssr = true;
export const csr = false;

import { error } from '@sveltejs/kit';
import { titles as pieces } from '../../../data/pieces';

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
	try {
		const piece = pieces.find((piece) => piece.slug === params.slug);
		const isList = url.searchParams.get('list') !== null;
		const htmlContent = (await fetch(`/raw_pieces/${piece.html}`)).text()
		
		return { piece, isList, htmlContent };
	} catch (e) {
		throw error(404, 'Not found');
	}
}

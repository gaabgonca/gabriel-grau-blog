import { error } from '@sveltejs/kit';
import { titles as pieces } from '../../../data/titles';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return pieces.find((piece) => piece.slug === params.slug);

	throw error(404, 'Not found');
}

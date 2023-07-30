export const ssr = false;
export const csr = true;

import { error } from '@sveltejs/kit';
import DOMPurify from 'dompurify';
import { titles as pieces } from '../../../data/pieces';

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
	try {
		console.log('Loading');
		const piece = pieces.find((piece) => piece.slug === params.slug);
		const isList = url.searchParams.get('list') !== null;
		const html = await fetchHtml(`/raw_pieces/${piece.html}`);
		const sanitizedHtml = DOMPurify.sanitize(html);
		console.log(sanitizedHtml);
		return { piece, isList, sanitizedHtml };
	} catch (e) {
		throw error(404, 'Not found');
	}
}

async function fetchHtml(filePath) {
	const response = await fetch(filePath);
	return await response.text();
}

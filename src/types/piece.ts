interface Piece {
	title: string;
	htmlContent?: string;
	cssContent?: string;
	type: 'poem' | 'story';
	slug: string;
	html?: string;
}

export { type Piece };

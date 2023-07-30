<script>
	import './styles.css';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import DOMPurify from 'dompurify';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section
	class="absolute top-0 left-0 w-full h-full bg-stone-200"
	transition:fade={{ duration: 1000 }}
>
	<h1 class="fixed sans-serif top-8 left-8 z-40 text-2xl text-stone-900 font-bold">
		{data.piece.title}
	</h1>
	<div
		class="fixed sans-serif flex bottom-4 md:bottom-auto right-4 md:top-8 md:right-8 w-auto h-auto z-40"
	>
		<a
			data-sveltekit-noscroll
			class="flter-btn sans-serif flex text-stone-900 bg-stone-200 hover:text-fuchsia-500 px-4 py-2 border hover:border-fuchsia-500 z-40"
			style="height: 42px"
			href={'/' + (data.isList ? 'list' : '')}>volver al inicio</a
		>
	</div>
	<div
		class="piece-content absolute overflow-auto md:pr-8 left-8 flex flex-col bottom-16 top-16 justify-start items-start h-4/5 mt-8 w-10/12 md:w-3/5"
	>
		<div class="spacer flex w-full">&nbsp;</div>
		{@html data.sanitizedHtml || '<h1>No hay contenido</h1>'}
		<div class="spacer w-full">&nbsp;</div>
	</div>
</section>

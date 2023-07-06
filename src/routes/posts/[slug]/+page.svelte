<script>
	import './styles.css';
	import { send, receive } from '../../../lib/transitions/pageCrossfade';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { Observer } from 'gsap/Observer';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	/** @type {import('./$types').PageData} */
	export let data;

	let htmlContent;

	async function fetchHtml(filePath) {
		const response = await fetch(filePath);
		return await response.text();
	}

	onMount(async () => {
		htmlContent = await fetchHtml(`/raw_pieces/${data.html}`);

		// ScrollTrigger configuration
		ScrollTrigger.create({
			trigger: '.piece-content',
			start: 'top 30',
			end: 'bottom top',
			scrub: true,
			pin: true
		});
	});
</script>

<section
	class="absolute top-0 left-0 w-full h-full bg-indigo-950"
	in:receive={{ key: 'cross-main' }}
	out:send={{ key: 'cross-main' }}
>
	<h1 class="fixed sans-serif top-8 left-8 z-40 text-2xl text-white font-bold">{data.title}</h1>
	<div
		class="fixed sans-serif flex bottom-4 md:bottom-auto right-4 md:top-8 md:right-8 w-auto h-auto z-40"
	>
		<a
			class="flter-btn sans-serif flex text-white bg-indigo-950 hover:text-fuchsia-500 px-4 py-2 border hover:border-fuchsia-500 z-40"
			style="height: 42px"
			href="/">volver al inicio</a
		>
	</div>
	<div
		class="piece-content absolute overflow-auto pr-8 left-8 flex flex-col bottom-16 top-16 justify-start items-start h-4/5 mt-8 w-4/5 md:w-3/5"
	>
		<div class="spacer flex w-full">&nbsp;</div>
		{@html htmlContent || '<h1>No hay contenido</h1>'}
		<div class="spacer w-full">&nbsp;</div>
	</div>
</section>

<script>
	import { onMount } from 'svelte';
	import { titles } from '../data/pieces';
	import { gsap } from 'gsap';
	import { Observer } from 'gsap/Observer';
	import { send, receive } from '../lib/transitions/pageCrossfade';
	import { tweenProperty } from '../lib/animations';

	gsap.registerPlugin(Observer);

	let container;
	let selectedPieces = titles;
	let titleElements, canvas, stories, poems;

	function generateTitleElement(piece) {
		const child = document.createElement('a');
		child.className =
			'titles absolute top-1/2 left-1/2 z-10 text-2xl font-bold text-white select-none hover:cursor-pointer w-max ' +
			piece.type;
		child.textContent = piece.title;
		child.href = `/posts/${piece.slug}`;
		container.appendChild(child);
	}

	function updateFilter(filter) {
		if (filter === 'all') {
			titleElements.forEach((element) => (element.style.display = 'flex'));
		} else if (filter === 'poem') {
			poems.forEach((element) => (element.style.display = 'flex'));
			stories.forEach((element) => (element.style.display = 'none'));
		} else if (filter === 'story') {
			stories.forEach((element) => (element.style.display = 'flex'));
			poems.forEach((element) => (element.style.display = 'none'));
		}
	}

	onMount(() => {
		selectedPieces.map(generateTitleElement);

		titleElements = gsap.utils.toArray('.titles');
		stories = gsap.utils.toArray('.story');
		poems = gsap.utils.toArray('.poem');

		canvas = document.querySelector('#canvas');
		// @ts-ignore
		let canvasWidth = canvas.offsetWidth;
		// @ts-ignore
		let canvasHeight = canvas.offsetHeight;

		gsap.set(titleElements, { xPercent: -50, yPercent: -50 });

		// x/y values for how far away from the center they can move
		var dx = canvasWidth * 0.4;
		var dy = canvasHeight * 0.5;

		titleElements.forEach(function (element, index) {
			Observer.create({
				target: element,
				type: 'touch,pointer',
				onHover: () => {
					try {
						gsap.killTweensOf(element);
						gsap.to(element, {
							scale: 1.2,
							opacity: 1,
							color: 'rgb(217 70 239)',
							duration: 1,
							ease: 'circ.out'
						});
					} catch (error) {}
				},
				onHoverEnd: () => {
					try {
						gsap.killTweensOf(element);
						gsap.to(element, {
							zIndex: 10,
							color: 'rgb(255,255,255)',
							duration: 0.2
						});
						tweenAll(element);
					} catch (error) {}
				}
			});

			tweenAll(element);
		});

		Observer.create({
			target: window,
			onWheel: () => {
				try {
					holdElements();
				} catch (error) {
					console.log(error);
				}
			}
		});

		function tweenAll(element) {
			tweenProperty(element, 'scale', 0.5, 1.2);
			tweenProperty(element, 'x', -dx, dx);
			tweenProperty(element, 'y', -dy, dy);
			tweenProperty(element, 'opacity', 0.7, 1);
		}

		function holdElements() {
			let tweens = gsap.getTweensOf(titleElements);
			tweens.forEach((tween) => {
				tween.pause();
				gsap.delayedCall(1, () => tween.resume());
			});
		}
	});
</script>

<svelte:head>
	<title>Gabriel Grau Caraballo</title>
	<meta name="description" content="Gabriel Grau Caraballo, Autor de ficción" />
</svelte:head>

<section
	class="absolute top-0 left-0 w-full h-full bg-indigo-950"
	in:receive={{ key: 'cross-main' }}
	out:send={{ key: 'cross-main' }}
>
	<div class="w-max h-min absolute top-8 left-8 z-40 bg-indigo-950">
		<h1 class="name sans-serif relative top-0 left-0 z-40 text-2xl text-white">
			Gabriel Grau Caraballo
		</h1>
		<h2 class="whoami sans-serif relative top-0 left-0 z-40 text-md text-white">
			Escribo ficciones (supuestamente)
		</h2>
	</div>
	<div
		bind:this={container}
		id="canvas"
		class="absolute top-0 left-0 w-full h-full bg-indigo-950"
	/>
	<div class="fixed bottom-4 md:bottom-auto right-4 md:top-8 md:right-8 w-auto z-40">
		<div class="flex row items-center justify-end">
			<button
				id="all-filter"
				class="sans-serif flter-btn text-white bg-indigo-950 hover:text-fuchsia-500 px-4 py-2 border hover:border-fuchsia-500"
				on:click={() => updateFilter('all')}>todos</button
			>
			<div class="w-2 md:w-8" />
			<button
				id="story-filter"
				class="sans-serif filter-btn text-white hover:text-fuchsia-500 bg-indigo-950 px-4 py-2 border hover:border-fuchsia-500"
				on:click={() => updateFilter('story')}>cuentos</button
			>
			<div class="w-2 md:w-8" />
			<button
				id={'poem-filter'}
				class="sans-serif filter-btn text-white hover:text-fuchsia-500 bg-indigo-950 px-4 py-2 border hover:border-fuchsia-500"
				on:click={() => updateFilter('poem')}>poemas</button
			>
		</div>
	</div>
</section>

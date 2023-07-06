<script>
	import { getContext, onMount, setContext } from 'svelte';
    import { writable } from 'svelte/store';
	import { titles } from '../data/pieces';
	import { gsap } from 'gsap';
	import { Observer } from 'gsap/Observer';
	import { send, receive } from '../lib/transitions/pageCrossfade';
	import { tweenProperty } from '../lib/animations';
	import { menuInitialized , titleElements} from '../stores';

	gsap.registerPlugin(Observer);

	let container;
	let selectedPieces = titles;
	let canvas, stories, poems;


	function generateTitleElement(piece) {
		const child = document.createElement('a');
		child.className =
			'titles absolute top-1/2 left-1/2 z-10 text-2xl font-bold text-neutral-600 select-none hover:cursor-pointer w-max ' +
			piece.type;
		child.textContent = piece.title;
		child.href = `/posts/${piece.slug}`;
		container.appendChild(child);
	}

	function updateFilter(filter) {
		if (filter === 'all') {
			$titleElements.forEach((element) => (element.style.display = 'flex'));
		} else if (filter === 'poem') {
			poems.forEach((element) => (element.style.display = 'flex'));
			stories.forEach((element) => (element.style.display = 'none'));
		} else if (filter === 'story') {
			stories.forEach((element) => (element.style.display = 'flex'));
			poems.forEach((element) => (element.style.display = 'none'));
		}
	}

	onMount(() => {
		console.log($menuInitialized);
		if (!$menuInitialized) {
			selectedPieces.map(generateTitleElement);
			titleElements.set(gsap.utils.toArray('.titles'))
		} else {
			$titleElements.forEach((element) => (container.appendChild(element)));
		}

		
		stories = gsap.utils.toArray('.story');
		poems = gsap.utils.toArray('.poem');

		canvas = document.querySelector('#canvas');
		// @ts-ignore
		let canvasWidth = canvas.offsetWidth;
		// @ts-ignore
		let canvasHeight = canvas.offsetHeight;

		if (!$menuInitialized) {
		gsap.set($titleElements, { xPercent: -50, yPercent: -50 });
		}
		// x/y values for how far away from the center they can move
		var dx = canvasWidth * 0.4;
		var dy = canvasHeight * 0.5;

		const isMobile = /Android|iPhone/i.test(navigator.userAgent)
		const minY = -0.8* dy
		const maxY = isMobile? 0.8* dy : dy

		$titleElements.forEach(function (element, index) {
			if(!$menuInitialized) {
			gsap.set(element, {
							x: gsap.utils.random(-dx, dx) * 0.7,
							y: gsap.utils.random(minY, maxY) * 0.7
						});
				}
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
							color: '#525252',
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
			tweenProperty(element, 'y', minY, maxY);
			tweenProperty(element, 'opacity', 0.4, 1);
		}

		function holdElements() {
			let tweens = gsap.getTweensOf($titleElements);
			tweens.forEach((tween) => {
				tween.pause();
				gsap.delayedCall(1, () => tween.resume());
			});
		}
		menuInitialized.set(true);
	});
</script>

<svelte:head>
	<title>Gabriel Grau Caraballo</title>
	<meta name="description" content="Gabriel Grau Caraballo, Autor de ficción" />
</svelte:head>

<section
	class="absolute top-0 left-0 w-full h-full bg-stone-200"
	in:receive={{ key: 'cross-main' }}
	out:send={{ key: 'cross-main' }}
>
	<div class="w-max h-min absolute top-8 left-8 z-40 bg-stone-200">
		<h1 class="name sans-serif relative top-0 left-0 z-40 text-2xl text-black ">
			Gabriel Grau Caraballo
		</h1>
		<h2 class="whoami sans-serif relative top-0 left-0 z-40 text-md text-black">
			Escribo ficciones (supuestamente)
		</h2>
	</div>
	<div
		bind:this={container}
		id="canvas"
		class="absolute top-0 left-0 w-full h-full bg-stone-200"
	/>
	<div class="fixed bottom-4 md:bottom-auto right-4 md:top-8 md:right-8 w-auto z-40">
		<div class="flex row items-center justify-end bg-stone-200">
			<button
				id="all-filter"
				class="sans-serif flter-btn text-stone-900 bg-stone-200 hover:text-fuchsia-500 px-4 py-2"
				on:click={() => updateFilter('all')}>todos</button
			>
			<div class="w-2 md:w-8" />
			<button
				id="story-filter"
				class="sans-serif filter-btn text-stone-900 hover:text-fuchsia-500 bg-stone-200 px-4 py-2"
				on:click={() => updateFilter('story')}>cuentos</button
			>
			<div class="w-2 md:w-8" />
			<button
				id={'poem-filter'}
				class="sans-serif filter-btn text-stone-900 hover:text-fuchsia-500 bg-stone-200 px-4 py-2"
				on:click={() => updateFilter('poem')}>poemas</button
			>
		</div>
	</div>
		<i class="fixed bottom-4 md:bottom-8 left-4 md:left-8 w-auto z-40 w-4 h-4 fixed fa fa-solid fa-bars scale-150"></i>
</section>

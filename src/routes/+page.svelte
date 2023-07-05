<script>
	import { onMount } from 'svelte';
	import { titles } from '../data/titles';
	import { gsap } from 'gsap';
	import { Observer } from 'gsap/Observer';

	gsap.registerPlugin(Observer);

	let container;

	function generateTitle(title) {
		const child = document.createElement('h1');
		child.className =
			'titles absolute top-1/2 left-1/2 z-10 text-2xl hover:text-3xl font-bold text-white hover:text-fuchsia-500 select-none';
		child.textContent = title;
		container.appendChild(child);
	}

	onMount(() => {
		titles.map(generateTitle);

		var titleElements = gsap.utils.toArray('.titles');

		var canvas = document.querySelector('#canvas'),
			// @ts-ignore
			canvasWidth = canvas.offsetWidth,
			// @ts-ignore
			canvasHeight = canvas.offsetHeight;

		gsap.set(titleElements, { xPercent: -50, yPercent: -50 });

		// x/y values for how far away from the center they can move
		var dx = canvasWidth * 0.4;
		var dy = canvasHeight * 0.5;

		// Animate our properties individually - by osublake
		titleElements.forEach(function (element, index) {
			Observer.create({
				target: element,
				type: 'touch,pointer',
				onHover: () => {
					try {
						gsap.killTweensOf(element);
						gsap.to(element, { scale: 1.2, duration: 1, ease: 'power1.out' });
					} catch (error) {}
				},
				onHoverEnd: () => {
					try {
						gsap.killTweensOf(element);
						tweenAll(element);
					} catch (error) {}
				}
			});
			tweenAll(element);
		});

		function tweenAll(element) {
			tweenProperty(element, 'scale', 0.5, 1.2);
			tweenProperty(element, 'x', -dx, dx);
			tweenProperty(element, 'y', -dy, dy);
		}

		function tweenProperty(target, prop, min, max) {
			gsap.to(target, {
				[prop]: gsap.utils.random(min, max),
				duration: 'random(10, 12)',
				ease: 'none',
				// @ts-ignore
				ease: 'power.inOut',
				onComplete: tweenProperty,
				onCompleteParams: [target, prop, min, max]
			});
		}
	});
</script>

<svelte:head>
	<title>Gabriel Grau</title>
	<meta name="description" content="Gabriel Grau Caraballo, Autor de ficción" />
</svelte:head>

<section class="absolute top-0 left-0 w-full h-full bg-indigo-950">
	<h1 class="fixed top-8 left-8 z-10 text-2xl text-white">Gabriel Grau Caraballo</h1>
	<div
		bind:this={container}
		id="canvas"
		class="absolute top-0 left-0 w-full h-full bg-violet-950"
	/>
</section>

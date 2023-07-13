<script>
	import './styles.css';
	import { onMount } from 'svelte';
	import { titles } from '../../data/pieces';
	import { gsap } from 'gsap';
	import { Observer } from 'gsap/Observer';
	import { listInitialized, listTitleElements } from '../../stores';
	import { fade } from 'svelte/transition';

	gsap.registerPlugin(Observer);

	let listContainer;
	let selectedPieces = titles;
	let stories, poems;

	function generateSpacerElement() {
		const child = document.createElement('div');
		child.className = 'list-spacer w-full';
		listContainer.appendChild(child);
	}

	function generateListTitleElement(piece) {
		const child = document.createElement('a');
		child.className =
			'list-titles z-10 font-bold text-neutral-600 select-none hover:cursor-pointer w-full ' +
			piece.type;
		if (piece.new === true) {
			child.className += ' text-3xl new-piece z-50';
		} else {
			child.className += ' text-xl z-10';
		}
		child.textContent = piece.title;
		child.href = `/posts/${piece.slug}?list=true`;
		child.setAttribute('data-sveltekit-noscroll', 'true');
		listContainer.appendChild(child);
	}

	function updateFilter(filter) {
		if (filter === 'all') {
			$listTitleElements.forEach((element) => (element.style.display = 'flex'));
		} else if (filter === 'poem') {
			poems.forEach((element) => (element.style.display = 'flex'));
			stories.forEach((element) => (element.style.display = 'none'));
		} else if (filter === 'story') {
			stories.forEach((element) => (element.style.display = 'flex'));
			poems.forEach((element) => (element.style.display = 'none'));
		}
	}

	onMount(() => {
		if (!$listInitialized) {
			generateSpacerElement();
			selectedPieces.map(generateListTitleElement);
			generateSpacerElement();
			listTitleElements.set(gsap.utils.toArray('.list-titles'));
		} else {
			generateSpacerElement();
			$listTitleElements.forEach((element) => listContainer.appendChild(element));
			generateSpacerElement();
		}

		stories = gsap.utils.toArray('.story');
		poems = gsap.utils.toArray('.poem');

		if (!$listInitialized) {
			$listTitleElements.forEach(function (element) {
				Observer.create({
					target: element,
					type: 'touch,pointer',
					onHover: () => {
						try {
							gsap.killTweensOf(element);
							gsap.to(element, {
								opacity: 1,
								fontWeight: 900,
								// height: "+20px",
								color: 'rgb(217 70 239)',
								duration: 1,
								ease: 'circ'
							});
						} catch (error) {
							console.log(error);
						}
					},
					onHoverEnd: () => {
						try {
							gsap.killTweensOf(element);
							gsap.to(element, {
								// height: "+0px",
								fontWeight: 700,
								color: '#525252',
								duration: 0.2
							});
						} catch (error) {
							console.log(error);
						}
					}
				});
			});
		}
		listInitialized.set(true);
	});
</script>

<svelte:head>
	<title>Gabriel Grau Caraballo</title>
	<meta name="description" content="Gabriel Grau Caraballo, Autor de ficción" />
</svelte:head>

<section
	class="absolute top-0 left-0 w-full h-full bg-stone-200"
	transition:fade={{ duration: 1000 }}
>
	<div class="w-max h-min absolute top-8 left-8 z-40 bg-stone-200">
		<h1 class="name sans-serif relative top-0 left-0 z-40 text-2xl text-black">
			Gabriel Grau Caraballo
		</h1>
		<h2 class="whoami sans-serif relative top-0 left-0 z-40 text-md text-black">
			Escribo ficciones (supuestamente)
		</h2>
	</div>
	<div class="absolute top-0 left-0 w-full h-full pt-28 pb-20 pl-8 md:pt-32 md:pb-32 md:px-20">
		<div
			bind:this={listContainer}
			id="listContainer"
			class={'relative top-0 left-0 w-full h-full bg-stone-200 overflow-scroll flex flex-col masked'}
		/>
	</div>
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
	<a href="/"
		><i
			class="fixed bottom-7 md:bottom-8 left-4 md:left-8 w-auto z-40 w-4 h-4 fa fa-solid fa-arrow-left scale-150"
		/></a
	>
</section>

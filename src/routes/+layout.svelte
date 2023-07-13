<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		@apply bg-stone-200;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<script>
	import { send, receive } from '../../../lib/transitions/pageCrossfade';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section
	class="absolute top-0 left-0 w-full h-full bg-indigo-950"
	in:receive={{ key: 'block' }}
	out:send={{ key: 'block' }}
>
	<h1 class="fixed top-8 left-8 z-40 text-2xl text-white">{data.title}</h1>
</section>

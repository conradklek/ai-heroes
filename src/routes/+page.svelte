<script>
	import Card from "$lib/components/Card.svelte"
	export let data
	let { cards } = data
</script>

<main class="col-span-full">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px w-full max-w-7xl mx-auto mt-8">
		{#if cards?.length}
			{#each cards as card}
				<Card {card} />
			{/each}
		{/if}
	</div>
</main>

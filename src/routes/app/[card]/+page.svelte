<script>
	import Card from "$lib/components/Card.svelte"
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	import { enhance } from "$app/forms"
	export let data
</script>

<div class="col-span-full">
	<div class="flex flex-row items-center justify-between w-full max-w-lg h-20 mx-auto">
		<a href="/app" class="text-sm underline">&larr; Go Back</a>
		{#if $page.data.user && $page.data.user.id === data.card.user_id}
			<form action="?/delete" method="post" use:enhance={() => {
				if (!confirm("Are you sure you want to delete this card?")) return
				return async () => {
					await goto("/app")
				}
			}}>
				<button type="submit" class="px-3 py-1 text-sm rounded bg-red-600">Delete</button>
			</form>
		{/if}
	</div>
	<Card card={data.card} />
</div>

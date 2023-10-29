<script>
	import { goto, invalidateAll } from "$app/navigation"
	import Card from "$lib/components/Card.svelte"
	import { toast } from "$lib/stores/toast"
	import { page } from "$app/stores"
	export let data
	let { cards } = data
	$: loading = false
	$: display = "cards"
</script>

<main class="z-0 relative col-span-full pb-16">
	<div class="flex flex-row items-center justify-center w-full max-w-4xl mx-auto pt-4 pb-10">
		<form class="flex flex-row items-end justify-center gap-1.5 w-full max-w-sm p-4"
			on:submit|preventDefault={async (e) => {
				if (loading) return
				loading = true
				let res = await fetch("/api", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						user: $page.data.user.id,
						data: e.target[0].value
					})
				})
				e.target[0].value = ""
				res = await res.json()
				loading = false
				if (!res.success) {
					return $toast = [...$toast, { id: crypto.randomUUID(), type: "error", title: "There was an error.", message: "Please try again." }]
				}
				await invalidateAll()
				await goto("/app")
			}}>
			<div class="flex flex-col w-full">
				<label for="input" class="block -m-0.5 p-2 text-xs leading-6 text-white">Briefly describe the hero <span class="hidden sm:inline">you would like to create</span>&hellip;</label>
				<input type="text" id="input" placeholder="A wise old wizard with a funny name" autocomplete="off" class="block w-full rounded bg-[hsl(232DEG,10%,8%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] border-0 py-1.5 ring-1 ring-inset ring-[hsl(232DEG,8%,12%)] placeholder:text-[hsl(232DEG,6%,18%)] focus:bg-[hsl(232DEG,8%,12%)] focus:ring-1 focus:ring-inset focus:ring-[hsl(254DEG,100%,50%)] sm:text-sm sm:leading-6" />
			</div>
			<button type="submit" disabled={loading} class="rounded bg-gradient-to-br from-[hsl(254DEG,100%,50%)] to-[hsl(254DEG,100%,44%)] border-t border-t-[hsl(254DEG,100%,54%)] border-b border-b-[hsl(254DEG,100%,36%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] ring-1 ring-inset ring-transparent grid place-items-center h-9 px-2 text-white hover:bg-[hsl(254DEG,100%,44%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[hsl(232DEG,10%,8%)]">
				{#if loading}
					<svg class="w-auto h-6 shrink-0 animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0003 2C12.5526 2 13.0003 2.44772 13.0003 3V6C13.0003 6.55228 12.5526 7 12.0003 7C11.448 7 11.0003 6.55228 11.0003 6V3C11.0003 2.44772 11.448 2 12.0003 2ZM19.0714 4.92893C19.4619 5.31946 19.4619 5.95262 19.0714 6.34315L16.95 8.46447C16.5595 8.85499 15.9264 8.85499 15.5358 8.46447C15.1453 8.07394 15.1453 7.44078 15.5358 7.05025L17.6572 4.92893C18.0477 4.53841 18.6808 4.53841 19.0714 4.92893ZM4.92923 4.92893C5.31975 4.53841 5.95292 4.53841 6.34344 4.92893L8.46476 7.05025C8.85529 7.44078 8.85529 8.07394 8.46476 8.46447C8.07424 8.85499 7.44107 8.85499 7.05055 8.46447L4.92923 6.34315C4.5387 5.95262 4.5387 5.31946 4.92923 4.92893ZM2 12.0007C2 11.4484 2.44772 11.0007 3 11.0007H6C6.55228 11.0007 7 11.4484 7 12.0007C7 12.553 6.55228 13.0007 6 13.0007H3C2.44772 13.0007 2 12.553 2 12.0007ZM17 12.0007C17 11.4484 17.4477 11.0007 18 11.0007H21C21.5523 11.0007 22 11.4484 22 12.0007C22 12.553 21.5523 13.0007 21 13.0007H18C17.4477 13.0007 17 12.553 17 12.0007ZM8.46476 15.5355C8.85529 15.9261 8.85529 16.5592 8.46476 16.9497L6.34344 19.0711C5.95292 19.4616 5.31975 19.4616 4.92923 19.0711C4.5387 18.6805 4.5387 18.0474 4.92923 17.6569L7.05055 15.5355C7.44107 15.145 8.07424 15.145 8.46476 15.5355ZM15.5358 15.5355C15.9264 15.145 16.5595 15.145 16.95 15.5355L19.0714 17.6569C19.4619 18.0474 19.4619 18.6805 19.0714 19.0711C18.6808 19.4616 18.0477 19.4616 17.6572 19.0711L15.5358 16.9497C15.1453 16.5592 15.1453 15.9261 15.5358 15.5355ZM12.0003 17C12.5526 17 13.0003 17.4477 13.0003 18V21C13.0003 21.5523 12.5526 22 12.0003 22C11.448 22 11.0003 21.5523 11.0003 21V18C11.0003 17.4477 11.448 17 12.0003 17Z" fill="white"/></svg>
				{:else}
					<svg class="w-auto h-6 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.25 4.75V15H3.75M3.75 15L7.75 11M3.75 15L7.75 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
				{/if}
			</button>
		</form>
	</div>
	{#if cards?.length}
		<div class="flex flex-row items-end justify-center gap-4 w-full max-w-7xl h-12 mx-auto -my-4 p-4 sm:px-6 lg:px-8 text-xs">
			<div class="flex flex-row items-end justify-start gap-4">
				View as:
				<button type="button" class:underline={display !== "cards"} class:text-[hsl(232DEG,6%,18%)]={display === "cards"} on:click={() => display = "cards"}>Cards</button>
				<button type="button" class:underline={display !== "table"} class:text-[hsl(232DEG,6%,18%)]={display === "table"} on:click={() => display = "table"}>Table</button>
			</div>
		</div>
		{#if display === "cards"}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px w-full max-w-7xl mx-auto mt-8">
				{#each cards as card (card.id)}
					<Card {card} />
				{/each}
			</div>
			{:else}
			<div class="w-full max-w-2xl mt-8 mx-auto flow-root px-4 sm:px-6 lg:px-8">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table class="min-w-full">
							<tbody class="divide-y divide-transparent">
								{#each cards as { id, name, description, image, background_image, rarity } (id)}
									{@const rarity_count = rarity === "common" ? 1 : rarity === "uncommon" ? 2 : rarity === "rare" ? 3 : rarity === "epic" ? 4 : 5 }
									<tr>
										<td class="z-0 relative whitespace-nowrap py-4 pl-4 pr-3 sm:pl-0">
											<div class="z-10 relative grid place-items-center w-12 h-12 aspect-square my-3 rounded-sm  shadow-md shadow-black ring-1 ring-gray-950/50 border border-gray-950/75 overflow-hidden">
												<img src={image} alt="" class="w-full h-full object-cover contrast-125 scale-125" />
											</div>
										</td>
										<td class="z-10 relative whitespace-nowrap px-3 py-4 text-xs underline font-medium text-white">
											<div class="flex flex-col gap-1.5">
												<a href="/app/{id}">{ name }</a>
												<div class="flex flex-row items-center gap-0.5 h-full">
													{#each Array(rarity_count) as _}
														<svg class="block w-auto h-2 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9019 1.56798C12.7356 1.22088 12.3849 1 12 1C11.6152 1 11.2644 1.22088 11.0982 1.56798L8.45542 7.08482L2.36984 7.8839C1.98727 7.93413 1.66773 8.2 1.54875 8.56705C1.42978 8.93411 1.5326 9.33687 1.81297 9.60198L6.26237 13.8093L5.14555 19.8172C5.07514 20.196 5.22857 20.5815 5.53998 20.8083C5.85139 21.0351 6.2654 21.0629 6.60429 20.8797L12 17.9625L17.3958 20.8797C17.7347 21.0629 18.1487 21.0351 18.4601 20.8083C18.7715 20.5815 18.9249 20.196 18.8545 19.8172L17.7377 13.8093L22.1871 9.60198C22.4675 9.33687 22.5703 8.93411 22.4513 8.56705C22.3323 8.2 22.0128 7.93413 21.6302 7.8839L15.5446 7.08482L12.9019 1.56798Z" fill="white"/></svg>
													{/each}
													{#each Array(5 - rarity_count) as _}
													<svg class="block w-auto h-2 shrink-0 opacity-25" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9019 1.56798C12.7356 1.22088 12.3849 1 12 1C11.6152 1 11.2644 1.22088 11.0982 1.56798L8.45542 7.08482L2.36984 7.8839C1.98727 7.93413 1.66773 8.2 1.54875 8.56705C1.42978 8.93411 1.5326 9.33687 1.81297 9.60198L6.26237 13.8093L5.14555 19.8172C5.07514 20.196 5.22857 20.5815 5.53998 20.8083C5.85139 21.0351 6.2654 21.0629 6.60429 20.8797L12 17.9625L17.3958 20.8797C17.7347 21.0629 18.1487 21.0351 18.4601 20.8083C18.7715 20.5815 18.9249 20.196 18.8545 19.8172L17.7377 13.8093L22.1871 9.60198C22.4675 9.33687 22.5703 8.93411 22.4513 8.56705C22.3323 8.2 22.0128 7.93413 21.6302 7.8839L15.5446 7.08482L12.9019 1.56798Z" fill="white"/></svg>
													{/each}
												</div>
											</div>
										</td>
										<td class="z-10 relative px-3 py-4 text-xs">{ description }</td>
										<td class="z-10 relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-xs underline sm:pr-0"></td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</main>

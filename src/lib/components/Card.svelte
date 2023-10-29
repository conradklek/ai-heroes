<script>
	export let card
	let { id, name, description, image, background_image, rarity, health, damage } = card
	let rarity_count = rarity === "common" ? 1 : rarity === "uncommon" ? 2 : rarity === "rare" ? 3 : rarity === "epic" ? 4 : 5
</script>

<div class="relative grid place-items-center w-full max-w-lg h-auto shrink-0 mx-auto">
	<div class="z-0 absolute top-0 left-0 grid place-items-center w-full h-full overflow-hidden opacity-25">
		<img src={background_image} alt="" class="w-full h-full object-cover contrast-125" />
	</div>
	<a href="/app/{id}" class="z-20 relative w-40 h-60 shrink-0 m-6 rounded-sm shadow-md shadow-black ring-1 ring-gray-950/50 border border-gray-950/75">
		<div class="z-20 absolute top-0 left-0 grid place-items-center w-full h-full mix-blend-hard-light opacity-50">
			<img src={image} alt="" class="w-full min-h-full object-cover" />
		</div>
		<div class="z-0 absolute top-0 left-0 grid place-items-center w-full h-full shadow-lg shadow-black/25">
			<img src={image} alt="" class="w-full min-h-full object-cover" />
		</div>
		<div class="z-10 absolute top-0 left-0 flex flex-col w-full h-full bg-gradient-to-t from-black via-black/50 to-transparent">
			<div class="relative flex flex-col justify-between w-full h-32">
				<div class="z-20 relative w-full h-6 px-2 bg-black">
					<span class="flex flex-row items-center justify-start gap-1.5">
						<span class="font-serif text-xs text-white leading-6 line-clamp-1">HP: {health}</span>
						<span class="font-serif text-xs text-white leading-6 line-clamp-1">DMG: {damage}</span>
					</span>
				</div>
				<div class="z-30 absolute top-0 right-0 flex flex-row items-center justify-end gap-0.5 w-full p-1">
					{#each Array(rarity_count) as _}
						<svg class="block w-auto h-2 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9019 1.56798C12.7356 1.22088 12.3849 1 12 1C11.6152 1 11.2644 1.22088 11.0982 1.56798L8.45542 7.08482L2.36984 7.8839C1.98727 7.93413 1.66773 8.2 1.54875 8.56705C1.42978 8.93411 1.5326 9.33687 1.81297 9.60198L6.26237 13.8093L5.14555 19.8172C5.07514 20.196 5.22857 20.5815 5.53998 20.8083C5.85139 21.0351 6.2654 21.0629 6.60429 20.8797L12 17.9625L17.3958 20.8797C17.7347 21.0629 18.1487 21.0351 18.4601 20.8083C18.7715 20.5815 18.9249 20.196 18.8545 19.8172L17.7377 13.8093L22.1871 9.60198C22.4675 9.33687 22.5703 8.93411 22.4513 8.56705C22.3323 8.2 22.0128 7.93413 21.6302 7.8839L15.5446 7.08482L12.9019 1.56798Z" fill="white"/></svg>
					{/each}
					{#each Array(5 - rarity_count) as _}
						<svg class="block w-auto h-2 shrink-0" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.772 1.14309C10.8635 0.952303 11.1365 0.952303 11.228 1.14309L13.9103 6.73469C13.9471 6.81148 14.0205 6.86451 14.1053 6.87563L20.2801 7.68532C20.4908 7.71295 20.5751 7.97123 20.421 8.11677L15.9039 12.3823C15.8419 12.4408 15.8138 12.5266 15.8294 12.6103L16.9634 18.7023C17.0021 18.9102 16.7813 19.0698 16.5945 18.969L11.1205 16.0136C11.0454 15.973 10.9546 15.973 10.8795 16.0136L5.40552 18.969C5.21875 19.0698 4.99788 18.9102 5.03658 18.7023L6.17058 12.6103C6.18615 12.5266 6.15812 12.4408 6.0961 12.3823L1.579 8.11677C1.42487 7.97123 1.50924 7.71295 1.71992 7.68532L7.89474 6.87563C7.97953 6.86451 8.05291 6.81148 8.08974 6.73469L10.772 1.14309Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
					{/each}
				</div>
			</div>
			<div class="flex flex-col w-full mt-auto bg-gradient-to-b from-transparent to-black">
				<div class="flex flex-row items-center justify-start gap-2 w-full p-2 pb-0">
					<span class="font-serif text-base underline text-white leading-6">{ name }</span>
				</div>
				<div class="p-2 pr-0 font-serif text-[0.525rem] text-white leading-[0.825rem]">{description}</div>
			</div>
		</div>
	</a>
</div>

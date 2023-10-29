<script>
	import "../app.css"
	import "$lib/assets/fonts/Inter.css"
	import "$lib/assets/fonts/BerkeleyMono.css"
	import "$lib/assets/fonts/LibreCaslonCondensed.css"
	import { enhance, applyAction } from "$app/forms"
	import Toast from "$lib/components/Toast.svelte"
	import { toast } from "$lib/stores/toast"
	import { page } from "$app/stores"
	import { onNavigate } from "$app/navigation"

	onNavigate((navigation) => {
			if (!document.startViewTransition) return
			return new Promise((resolve) => {
					document.startViewTransition(async () => {
							resolve()
							await navigation.complete
					})
			})
	})
</script>

<Toast bind:toast={$toast} />

<main class="z-10 relative grid grid-cols-12 w-full mx-auto">
	<header class="z-20 relative flex flex-row items-center justify-between col-span-full h-36 sm:h-20 sm:px-6 lg:px-8">
		<h1 class="flex flex-row items-center justify-start gap-2 col-span-4 p-4">
			<a href={ $page.data.user ? "/app" : "/" } class="relative flex flex-row items-center justify-start gap-2 font-semibold tracking-wide whitespace-nowrap">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 7.49992C3 7.13864 3.19486 6.80546 3.50975 6.62834L11.5097 2.12842C11.8142 1.95719 12.1858 1.95719 12.4903 2.12842L20.4903 6.62837C20.8052 6.80549 21 7.13867 21 7.49995V16.4999C21 16.8612 20.8052 17.1944 20.4903 17.3715L12.4902 21.8714C12.1858 22.0427 11.8142 22.0427 11.5098 21.8714L3.50977 17.3718C3.19488 17.1947 3 16.8615 3 16.5002V7.49992ZM8.50003 12C8.50003 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.50003 13.933 8.50003 12Z" fill="currentColor" /></svg>
				AI HEROES
			</a>
		</h1>
		{#if !$page.data.user}
			<div class="absolute top-0 right-0 grid grid-cols-2 grid-rows-1 gap-4 col-span-3 items-center text-sm bg-[hsl(232DEG,8%,12%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] rounded-bl w-56 h-9 shrink-0 p-1 overflow-hidden">
				<a href="/sign-up" class="z-10 relative col-span-1 grid place-items-center -mt-1 p-4 tracking-wide whitespace-nowrap">Sign Up</a>
				<a href="/sign-in" class="z-10 relative col-span-1 grid place-items-center -translate-x-0.5 -mt-1 p-4 tracking-wide whitespace-nowrap">Sign In</a>
				<div class="z-0 absolute -top-2 left-0 grid place-items-center w-28 h-11 p-1" class:-translate-x-[100%]={!["/sign-in", "/sign-up"].includes($page.route.id)} class:translate-x-0={$page.route.id === "/sign-up"} class:translate-x-[100%]={$page.route.id === "/sign-in"}>
					<div class="w-full h-full bg-gradient-to-br from-[hsl(254DEG,100%,50%)] to-[hsl(254DEG,100%,44%)] border-t border-t-[hsl(254DEG,100%,54%)] border-b border-b-[hsl(254DEG,100%,36%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] rounded-sm"></div>
				</div>
			</div>
		{:else}
			<div class="absolute top-0 right-0 grid grid-cols-2 grid-rows-1 gap-4 col-span-3 items-center text-sm bg-[hsl(232DEG,8%,12%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] rounded-bl w-56 h-9 shrink-0 p-1 overflow-hidden">
				<a href="/app" class="z-10 relative col-span-1 grid place-items-center -mt-1 p-4 tracking-wide whitespace-nowrap">My Heroes</a>
				<form action="/app?/logout" method="POST" use:enhance={() => { return async ({ result }) => await applyAction(result.data) }} class="z-10 relative col-span-1 grid place-items-center -translate-x-0.5 -mt-1 p-4 tracking-wide whitespace-nowrap">
					<button type="submit">Logout</button>
				</form>
				<div class="z-0 absolute -top-2 left-0 grid place-items-center w-28 h-11 p-1" class:-translate-x-[100%]={!["/app", "/sign-in"].includes($page.route.id)} class:translate-x-0={$page.route.id === "/app"} class:translate-x-[100%]={$page.route.id === "/sign-in"}>
					<div class="w-full h-full bg-gradient-to-br from-[hsl(254DEG,100%,50%)] to-[hsl(254DEG,100%,44%)] border-t border-t-[hsl(254DEG,100%,54%)] border-b border-b-[hsl(254DEG,100%,36%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] rounded-sm"></div>
				</div>
			</div>
		{/if}
	</header>
	<slot />
</main>

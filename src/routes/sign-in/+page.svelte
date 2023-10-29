<script>
	import { enhance, applyAction } from "$app/forms"
	import { toast } from "$lib/stores/toast"
	import { page } from "$app/stores"
</script>

<div class="z-10 relative flex items-center justify-center col-span-full -mt-4 px-4 py-16 sm:px-6 lg:px-8">
	<div class="relative z-10 w-full max-w-xs space-y-10">
		<div class="-mt-0.5">
			<a href={$page.data.user ? "/app" : "/"} class="grid place-items-center w-10 h-10 shrink-0 mx-auto rounded-full bg-gradient-to-br from-[hsl(254DEG,100%,50%)] to-[hsl(254DEG,100%,44%)] border-t border-t-[hsl(254DEG,100%,54%)] border-b border-b-[hsl(254DEG,100%,36%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)]">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 7.49992C3 7.13864 3.19486 6.80546 3.50975 6.62834L11.5097 2.12842C11.8142 1.95719 12.1858 1.95719 12.4903 2.12842L20.4903 6.62837C20.8052 6.80549 21 7.13867 21 7.49995V16.4999C21 16.8612 20.8052 17.1944 20.4903 17.3715L12.4902 21.8714C12.1858 22.0427 11.8142 22.0427 11.5098 21.8714L3.50977 17.3718C3.19488 17.1947 3 16.8615 3 16.5002V7.49992ZM8.50003 12C8.50003 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.50003 13.933 8.50003 12Z" fill="currentColor" /></svg>
			</a>
			<h1 class="mt-10 text-center text-2xl">Login to your account</h1>
		</div>
		<form
			class="space-y-6"
			action="?/login"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === "failure") {
						$toast = [...$toast, { id: crypto.randomUUID(), type: "error", title: "There was an error logging in.", message: result.data.error }]
					} else {
						await applyAction(result.data)
					}
				}
			}}>
			<div class="relative -space-y-px rounded-md">
				<div class="pointer-events-none absolute inset-0 z-10 shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] rounded-md ring-1 ring-inset ring-[hsl(232DEG,8%,12%)]" />
				<div>
					<label for="email" class="sr-only">Email address</label>
					<input id="email" name="email" type="email" autocomplete="off" class="relative block w-full bg-[hsl(232DEG,10%,8%)] rounded-t-md border-0 py-2 ring-1 ring-inset ring-[hsl(232DEG,8%,12%)] placeholder:text-[hsl(232DEG,8%,12%)] focus:z-10 focus:bg-[hsl(232DEG,8%,12%)] focus:ring-1 focus:ring-inset focus:ring-[hsl(232DEG,8%,12%)]" placeholder="Email" />
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input id="password" name="password" type="password" autocomplete="off" class="relative block w-full bg-[hsl(232DEG,10%,8%)] rounded-b-md border-0 py-2 ring-1 ring-inset ring-[hsl(232DEG,8%,12%)] placeholder:text-[hsl(232DEG,8%,12%)] focus:z-10 focus:bg-[hsl(232DEG,8%,12%)] focus:ring-1 focus:ring-inset focus:ring-[hsl(232DEG,8%,12%)]" placeholder="Password" />
				</div>
			</div>
			<div class="mt-8 pt-3">
				<button type="submit" class="flex w-full justify-center rounded bg-gradient-to-br from-[hsl(254DEG,100%,50%)] to-[hsl(254DEG,100%,44%)] border-t border-t-[hsl(254DEG,100%,54%)] border-b border-b-[hsl(254DEG,100%,36%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] ring-1 ring-inset ring-transparent px-3 py-1.5 leading-7 text-white hover:bg-[hsl(254DEG,100%,44%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[hsl(232DEG,10%,8%)]">Sign in</button>
			</div>
		</form>
	</div>
	<div class="z-0 pointer-events-none absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
		<div class="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[hsla(232DEG,100%,50%,40%)] to-[hsla(232DEG,100%,50%,20%)]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
	</div>
</div>

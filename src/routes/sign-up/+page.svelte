<script>
	import { enhance, applyAction } from "$app/forms"
	import { toast } from "$lib/stores/toast"
</script>

<div class="z-10 relative flex flex-col justify-center col-span-full -mt-4 px-4 py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-[480px] pt-3.5">
		<a href="/app" class="grid place-items-center w-10 h-10 shrink-0 mx-auto rounded-full bg-gradient-to-br from-[hsl(254DEG,100%,50%)] to-[hsl(254DEG,100%,44%)] border-t border-t-[hsl(254DEG,100%,54%)] border-b border-b-[hsl(254DEG,100%,36%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)]">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 7.49992C3 7.13864 3.19486 6.80546 3.50975 6.62834L11.5097 2.12842C11.8142 1.95719 12.1858 1.95719 12.4903 2.12842L20.4903 6.62837C20.8052 6.80549 21 7.13867 21 7.49995V16.4999C21 16.8612 20.8052 17.1944 20.4903 17.3715L12.4902 21.8714C12.1858 22.0427 11.8142 22.0427 11.5098 21.8714L3.50977 17.3718C3.19488 17.1947 3 16.8615 3 16.5002V7.49992ZM8.50003 12C8.50003 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.50003 13.933 8.50003 12Z" fill="currentColor" /></svg>
		</a>
		<h1 class="mt-10 text-center text-2xl leading-9 sm:text-3xl">Create your Account</h1>
		<p class="mt-3 px-6 sm:px-0 text-center">Enter your information below to begin creating your heroes.</p>
	</div>
	<div class="sm:mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="relative px-6 pt-8 pb-12 sm:bg-[hsla(232DEG,10%,8%,90%)] sm:shadow-sm sm:shadow-[hsla(232DEG,10%,4%,50%)] sm:ring-1 sm:ring-inset sm:ring-[hsl(232DEG,8%,12%)] sm:rounded-md sm:px-12">
			<div class="pointer-events-none absolute top-0 left-0 hidden sm:flex w-full justify-center">
				<div class="left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-[hsl(254DEG,100%,44%)] to-[rgba(17,17,17,0)] transition-all duration-1000" />
			</div>
			<form 
			class="sm:pt-3 space-y-4" 
			action="?/signup"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === "failure") {
						$toast = [...$toast, { id: crypto.randomUUID(), type: "error", title: "There was an error creating your account.", message: result.data.error }]
					} else {
						$toast = [...$toast, { id: crypto.randomUUID(), type: "success", title: "Your account has been created.", message: "You can now login to your account." }]
						await applyAction(result.data)
					}
				}
			}}>
				<div class="grid grid-cols-6 gap-x-2 gap-y-3">
					<div class="col-span-3">
						<label for="first_name" class="block text-sm tracking-wide leading-6">First name</label>
						<div class="mt-1">
							<input type="text" name="first_name" id="first_name" autocomplete="off" class="block w-full rounded bg-[hsl(232DEG,10%,8%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] border-0 py-2 ring-1 ring-inset ring-[hsl(232DEG,8%,12%)] placeholder:text-[hsl(232DEG,8%,12%)] focus:bg-[hsl(232DEG,8%,12%)] focus:ring-1 focus:ring-inset focus:ring-[hsl(232DEG,8%,12%)] tracking-wide sm:text-sm sm:leading-6" />
						</div>
					</div>
					<div class="col-span-3">
						<label for="last_name" class="block text-sm tracking-wide leading-6">Last name</label>
						<div class="mt-1">
							<input type="text" name="last_name" id="last_name" autocomplete="off" class="block w-full rounded bg-[hsl(232DEG,10%,8%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] border-0 py-2 ring-1 ring-inset ring-[hsl(232DEG,8%,12%)] placeholder:text-[hsl(232DEG,8%,12%)] focus:bg-[hsl(232DEG,8%,12%)] focus:ring-1 focus:ring-inset focus:ring-[hsl(232DEG,8%,12%)] tracking-wide sm:text-sm sm:leading-6" />
						</div>
					</div>
					<div class="col-span-full">
						<label for="email" class="block text-sm tracking-wide leading-6">Email address</label>
						<div class="mt-1">
							<input id="email" name="email" type="email" autocomplete="off" class="block w-full rounded bg-[hsl(232DEG,10%,8%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] border-0 py-2 ring-1 ring-inset ring-[hsl(232DEG,8%,12%)] placeholder:text-[hsl(232DEG,8%,12%)] focus:bg-[hsl(232DEG,8%,12%)] focus:ring-1 focus:ring-inset focus:ring-[hsl(232DEG,8%,12%)] tracking-wide sm:text-sm sm:leading-6" />
						</div>
					</div>
					<div class="col-span-full">
						<label for="password" class="block text-sm tracking-wide leading-6">Password</label>
						<div class="mt-1">
							<input id="password" name="password" type="password" autocomplete="off" class="block w-full rounded bg-[hsl(232DEG,10%,8%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] border-0 py-2 ring-1 ring-inset ring-[hsl(232DEG,8%,12%)] placeholder:text-[hsl(232DEG,8%,12%)] focus:bg-[hsl(232DEG,8%,12%)] focus:ring-1 focus:ring-inset focus:ring-[hsl(232DEG,8%,12%)] tracking-wide sm:text-sm sm:leading-6" />
						</div>
					</div>
					<div class="col-span-full mt-8">
						<button type="submit" class="flex w-full justify-center rounded bg-gradient-to-br from-[hsl(254DEG,100%,50%)] to-[hsl(254DEG,100%,44%)] border-t border-t-[hsl(254DEG,100%,54%)] border-b border-b-[hsl(254DEG,100%,36%)] shadow-sm shadow-[hsla(232DEG,10%,4%,50%)] ring-1 ring-inset ring-transparent px-3 py-1.5 leading-7 text-white hover:bg-[hsl(254DEG,100%,44%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-[hsl(232DEG,10%,8%)]">Continue</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="pointer-events-none absolute left-[calc(50%-4rem)] top-0 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
		<div class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[hsla(232DEG,100%,50%,50%)] to-[hsla(232DEG,100%,40%,20%)]" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"></div>
	</div>
</div>

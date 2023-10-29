<script>
	export let toast = []
</script>

<div aria-live="assertive" class="z-40 pointer-events-none fixed bottom-0 right-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
	<div class="flex w-full flex-col items-center space-y-3 sm:items-end">
		{#each toast as notification (notification.id)}
			{#if notification.type === "success"}
				<div class="pointer-events-auto w-80 overflow-hidden rounded-md bg-green-300/90 ring-1 ring-inset ring-green-600 ring-opacity-50">
					<div class="p-2.5 pb-3.5 pr-0">
						<div class="flex items-start pr-2">
							<div class="flex-shrink-0">
								<svg class="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
							</div>
							<div class="ml-3 w-0 flex-1 pt-0.5">
								<p class="text-xs font-medium text-green-900">{ notification.title }</p>
								<p class="mt-1 text-xs text-green-800">{ notification.message }</p>
							</div>
							<div class="ml-4 mr-1 flex flex-shrink-0 translate-x-0.5 -translate-y-0.5">
								<button type="button" on:click={() => { toast = toast.filter((toast) => toast.id !== notification.id) } } class="inline-flex rounded-md bg-green-600/10 text-green-800 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
									<span class="sr-only">Close</span>
									<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			{:else if notification.type === "info"}
				<div class="pointer-events-auto w-80 max-w-sm overflow-hidden rounded-md bg-blue-300/90 ring-1 ring-inset ring-blue-600 ring-opacity-50">
					<div class="p-3 pb-3.5 pr-0">
						<div class="flex items-start">
							<div class="flex-shrink-0">
								<svg class="h-6 w-6 text-blue-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" /></svg>
							</div>
							<div class="ml-3 w-0 flex-1 pt-0.5">
								<p class="text-xs font-medium text-blue-900">{ notification.title }</p>
								<p class="mt-1 text-xs text-blue-900">{ notification.message }</p>
							</div>
							<div class="ml-4 flex flex-shrink-0 translate-x-0.5 -translate-y-0.5">
								<button type="button" on:click={() => { toast = toast.filter((toast) => toast.id !== notification.id) } } class="inline-flex rounded-md bg-blue-600/10 text-blue-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
									<span class="sr-only">Close</span>
									<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			{:else if notification.type === "warn"}
				<div class="pointer-events-auto w-80 max-w-sm overflow-hidden rounded-md bg-yellow-300/90 ring-1 ring-inset ring-yellow-700 ring-opacity-50">
					<div class="p-3 pb-3.5 pr-0">
						<div class="flex items-start">
							<div class="flex-shrink-0">
								<svg class="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>
							</div>
							<div class="ml-3 w-0 flex-1 pt-0.5">
								<p class="text-xs font-medium text-yellow-800">{ notification.title }</p>
								<p class="mt-1 text-xs text-yellow-700">{ notification.message }</p>
							</div>
							<div class="ml-4 flex flex-shrink-0 translate-x-0.5 -translate-y-0.5">
								<button type="button" on:click={() => { toast = toast.filter((toast) => toast.id !== notification.id) } } class="inline-flex rounded-md bg-yellow-500/20 text-yellow-800 hover:text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
									<span class="sr-only">Close</span>
									<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			{:else if notification.type === "error"}
				<div class="pointer-events-auto w-96 max-w-sm overflow-hidden rounded-md bg-red-100 ring-1 ring-inset ring-red-500 ring-opacity-20">
					<div class="p-3 pb-3.5">
						<div class="flex items-start">
							<div class="flex-shrink-0">
								<svg class="h-6 w-6 text-red-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg>
							</div>
							<div class="ml-3 w-0 flex-1 pt-0.5">
								<p class="text-sm font-medium text-red-900">{ notification.title }</p>
								<p class="mt-1 text-sm text-red-800">{ notification.message }</p>
							</div>
							<div class="ml-4 flex flex-shrink-0 translate-x-0.5 -translate-y-0.5">
								<button type="button" on:click={() => { toast = toast.filter((toast) => toast.id !== notification.id) } } class="inline-flex rounded-md bg-red-600/10 text-red-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
									<span class="sr-only">Close</span>
									<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

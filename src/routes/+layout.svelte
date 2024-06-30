<script>
	import '../app.css';
	import { setAuthContext } from '$lib/pocketbase/auth.svelte';

	const { children } = $props();
	const auth = setAuthContext();
</script>

{#if auth.isSynced}
	{@render children()}
{:else}
	<div>Loading...</div>
{/if}

<style></style>

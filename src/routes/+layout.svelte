<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import { fade } from 'svelte/transition';
	export let data;
</script>

{#key data.url}
	<div class="wrapper">
		<Nav />
		<div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
			<slot />
		</div>
	</div>
{/key}

<style>
	.wrapper {
		background-color: var(--theme-color);
		margin-top: 4rem;
	}
</style>

<script lang="ts">
	import Nav from '../components/Nav.svelte';
</script>

<div class="wrapper">
	<Nav />
	<slot />
</div>

<style>
	.wrapper {
		background-color: var(--theme-color);
		margin-top: 4rem;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	export let chartString: string;
	export let companyCategoryData;
	const charts = {
		Treemap: '../charts/Treemap.svelte'
	};
	let chosenChart;

	onMount(async () => {
		chosenChart = (await import(charts[chartString])).default;
	});
</script>

<section>
	<svelte:component this={chosenChart} />
</section>

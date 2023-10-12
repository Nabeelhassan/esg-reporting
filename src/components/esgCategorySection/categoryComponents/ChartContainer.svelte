<script lang="ts">
	import { onMount } from 'svelte';
	import Legend from '../charts/Legend.svelte';
	export let chartString: string;
	export let data;
	export let year;
	export let colors;
	const charts = {
		Treemap: '../charts/Treemap.svelte',
		CircleWaste: '../charts/CircleWaste.svelte',
		WaterBars: '../charts/WaterBars.svelte',
		TopManagement: '../charts/TopManagement.svelte',
		FulltimeParttime: '../charts/FulltimeParttime.svelte',
		MaleFemaleTotal: '../charts/MaleFemaleTotal.svelte',
		PaymentPractices: '../charts/PaymentPractices.svelte',
		CorruptionBribery: '../charts/CorruptionBribery.svelte'
	};
	let chosenChart;
	let storeData = data;
	if (chartString === 'Treemap') {
		const dontInclude = [
			'Total GHG emissions',
			'Total GHG Scope 3',
			'GHG intensity based on net revenue'
		];
		storeData = data.filter((item) => !dontInclude.includes(item.name));
	}
	onMount(async () => {
		chosenChart = (await import(charts[chartString])).default;
	});
</script>

<section>
	<svelte:component this={chosenChart} data={storeData} {year} {colors} />
	{#if chartString === 'Treemap'}
		<Legend {colors} />
	{/if}
</section>

<style>
	section {
		flex: 1 1 66%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
	}
</style>

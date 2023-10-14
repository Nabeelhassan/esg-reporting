<script lang="ts">
	import Legend from '../charts/Legend.svelte';
	export let chartString: string;
	export let data;
	export let year;
	export let colors;
	export let category;
	const charts = {
		Treemap: () => import('../charts/Treemap.svelte'),
		CircleWaste: () => import('../charts/CircleWaste.svelte'),
		WaterBars: () => import('../charts/WaterBars.svelte'),
		TopManagement: () => import('../charts/TopManagement.svelte'),
		FulltimeParttime: () => import('../charts/FulltimeParttime.svelte'),
		MaleFemaleTotal: () => import('../charts/MaleFemaleTotal.svelte'),
		PaymentPractices: () => import('../charts/PaymentPractices.svelte'),
		CorruptionBribery: () => import('../charts/CorruptionBribery.svelte')
	};
	let chosenChart;
	let storeData = data;
	if (chartString === 'Treemap') {
		const dontInclude = [
			'Total GHG emissions',
			'Total GHG Scope 3',
			'GHG intensity based on net revenue',
			'Total energy consumption non-renewable sources',
			'Total energy consumption renewable sources',
			'Energy intensity based on net revenue',
			'Share of renewable energy from total',
			'Energy consumption total'
		];
		storeData = data.filter((item) => !dontInclude.includes(item.name));
	}
</script>

<section style="--align: {chartString === 'Treemap' ? 'center' : 'flex-end'}">
	{#await charts[chartString]() then module}
		<svelte:component this={module.default} data={storeData} {year} {colors} />
	{/await}
	{#if chartString === 'Treemap'}
		<Legend {colors} {category} />
	{/if}
</section>

<style>
	section {
		flex: 1 1 66%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: var(--align);
	}
</style>

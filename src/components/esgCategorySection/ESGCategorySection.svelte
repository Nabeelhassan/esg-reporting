<script lang="ts">
	import ChartContainer from './categoryComponents/ChartContainer.svelte';
	import LeftContentContainer from './content/LeftContentContainer.svelte';
	export let data;
	export let category: string;
	export let chartString: string;
	export let description: string;
	export let pillarColor: string;
	export let tableContent;
	$: year = 2026;
	const categoryData = data.values.filter((item) =>
		category === 'fullTimeEmployees'
			? item.pillar_subcategory === category || item.pillar_subcategory === 'partTimeEmployees'
			: item.pillar_subcategory === category
	);
	const title = categoryData[0].pillar_subcategory_name;
	const colors = [
		{ value: '#BCDA7F', name: 'GHG Scope 1' },
		{ value: '#D5E4B6', name: 'GHG Scope 2' },
		{ value: '#E7F1D3', name: 'GHG Scope 3' },
		{ value: '#BCDA7F', name: 'Energy consumption renewable sources' },
		{ value: '#D5E4B6', name: 'Energy consumption non-renewable sources' }
	];
</script>

<section style="--pillar-color: {pillarColor}">
	<LeftContentContainer
		{title}
		{description}
		data={categoryData}
		{year}
		{tableContent}
		{pillarColor}
	/>
	<ChartContainer {category} {chartString} data={categoryData} {year} {colors} />
</section>

<style>
	section {
		display: flex;
		padding: 2rem;
		border-bottom: solid 4px var(--pillar-color);
		height: calc(100vh - 4rem);
	}
</style>

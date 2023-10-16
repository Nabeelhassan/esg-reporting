<script lang="ts">
	export let title: string;
	export let description: string;
	export let data: any;
	export let scoreData;
	export let year: number;
	export let tableContent;
	export let pillarColor;
	import DataTable from './DataTableGHG.svelte';
	import roundToDecimal from '../../../helpers/roundToDecimal';
	const dataScore = roundToDecimal(scoreData.values[year].score, 100);
</script>

<section>
	<h1>{title}</h1>
	<h2>Score: {dataScore}/1</h2>
	<p>
		{description}
	</p>
	<DataTable {tableContent} {pillarColor} />
</section>

<style>
	h1,
	h2 {
		margin: 0 0 0;
	}
	h1 {
		font-size: 4rem;
		text-transform: uppercase;
		line-height: 0.8;
		margin-bottom: calc(4rem * 0.2);
	}
	h2 {
		font-size: 2em;
	}
	p {
		margin: 1rem 0;
	}
</style>

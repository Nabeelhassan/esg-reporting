<script lang="ts">
	import PillarLegend from '../../PillarLegend.svelte';
	import SpinPlot from './SpinPlot.svelte';
	import SpinEsgBoard from './SpinESGBoard.svelte';
	import { writable } from 'svelte/store';
	export let companyData;
	export let count;
	export let year;
	const maxRotate = 30;
	const rotation = -maxRotate + companyData.score.ESG[year] * maxRotate;
	const maxWidth = writable(0);
</script>

<section style="--rotation: {rotation}deg">
	<SpinPlot {companyData} {count} {year} {maxWidth} />
	<SpinEsgBoard data={companyData} {year} {maxWidth} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		height: 100%;
		transform: rotate(var(--rotation));
	}
</style>

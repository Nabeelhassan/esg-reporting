<script lang="ts">
	import PillarLegend from '../../PillarLegend.svelte';
	import SpinPlot from './SpinPlot.svelte';
	import SpinEsgBoard from './SpinESGBoard.svelte';
	export let companyData;
	export let count;
	export let year;
	const maxRotate = 30;
	const rotation = -maxRotate + companyData.score.ESG[year] * maxRotate;
</script>

<section style="--rotation: {rotation}deg">
	<SpinPlot {companyData} {count} {year} />
	<SpinEsgBoard data={companyData} {year} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		height: 100%;
		transform: rotate(var(--rotation));
	}
</style>

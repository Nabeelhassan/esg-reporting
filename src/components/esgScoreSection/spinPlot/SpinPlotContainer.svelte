<script lang="ts">
	import PillarLegend from '../../PillarLegend.svelte';
	import SpinPlotOptimized from './SpinPlot.svelte';
	export let companyData;
	export let count;
	export let year;
</script>

<section>
	<SpinPlotOptimized {companyData} {count} {year} />
	<PillarLegend />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>

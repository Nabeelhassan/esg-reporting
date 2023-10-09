<script lang="ts">
	export let data;
	export let year;
	import SpinPlot from '../esgScoreSection/spinPlot/SpinPlot.svelte';
	export let count;
</script>

<section>
	{#each data.data as company}
		<SpinPlot companyData={company} {count} {year} />
		<!-- <SpinPlotAllCompanies companyData={company} {count} {year} /> -->
	{/each}
</section>

<style>
	section {
		min-height: 100vh;
		display: flex;
	}
</style>

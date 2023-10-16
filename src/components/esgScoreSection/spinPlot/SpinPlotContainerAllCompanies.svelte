<script lang="ts">
	import { writable } from 'svelte/store';
	import SpinPlot from './SpinPlot.svelte';
	import SpinEsgBoard from './SpinESGBoard.svelte';
	export let companyData;
	export let count;
	export let year;
	const maxRotate = 30;
	const rotation = -maxRotate + companyData.score.ESG[year] * maxRotate;
	const maxWidth = writable(0);
	const allCompanies = true;
</script>

<section style="--rotation: {rotation}deg">
	<h2>{companyData.name}</h2>
	<SpinPlot {companyData} {count} {year} {maxWidth} {allCompanies} />
	<SpinEsgBoard data={companyData} {year} {maxWidth} />
</section>

<style>
	section {
		min-width: 20rem;
		max-width: 20rem;
		display: flex;
		flex-direction: column;
		transform: rotate(var(--rotation));
	}
	section h2 {
		width: 100%;
		margin: 0;
		text-align: center;
		transform: translateY(-1rem) rotate(calc(var(--rotation) * -1));
	}
</style>

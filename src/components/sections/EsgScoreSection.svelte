<script lang="ts">
	import SpinPlot from '../SpinPlot.svelte';
	import EsgScoreText from '../ESGScoreText.svelte';
	import EsgScoreMeter from '../ESGScoreMeter.svelte';
	import TimeLine2025Svg from '../TimeLine2025SVG.svelte';
	import TimeLine2026SVg from '../TimeLine2026SVg.svelte';
	import TimeLine2030Svg from '../TimeLine2030SVG.svelte';
	export let companyData;
	export let pathData;
	export let data;
	export let content;
	export let year;
	console.log(pathData);
</script>

<section>
	<div class="left">
		<div class="title-container">
			<EsgScoreText {companyData} />
			<EsgScoreMeter {data} {companyData} />
		</div>
		<div class="text-container">
			<p>
				{content}
			</p>
		</div>
		<div>
			{#if year === '2025'}
				<TimeLine2025Svg />
			{/if}
			{#if year === '2026'}
				<TimeLine2026SVg />
			{/if}
			{#if year === '2030'}
				<TimeLine2030Svg />
			{/if}
		</div>
	</div>
	<div><SpinPlot {pathData} {data} {companyData} /></div>
	<div />
</section>

<style>
	section {
		display: flex;
		height: 100vh;
		padding: 5rem;
	}
	section div:nth-of-type(odd) {
		flex: 0.5;
	}
	section > div {
		flex: 1;
	}
</style>

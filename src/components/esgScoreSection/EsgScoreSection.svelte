<script lang="ts">
	import EsgScoreText from './scoreContent/ESGScoreText.svelte';
	import EsgScoreMeter from './scoreContent/ESGScoreMeter.svelte';
	import SpinPlotContainer from './spinPlot/SpinPlotContainer.svelte';
	import TimeLineScore from '../TimeLineScore.svelte';
	import ScoreLegend from '../ScoreLegend.svelte';
	export let companyData;
	export let data;
	export let content;
	export let year;
	export let count;
</script>

<section>
	<div class="left">
		<div class="title-container">
			<EsgScoreText {companyData} {year} />
			<EsgScoreMeter {data} {companyData} {year} />
		</div>
		<div class="text-container">
			<p>
				{content}
			</p>
		</div>
	</div>
	<div>
		<SpinPlotContainer {companyData} {count} {year} />
	</div>
	<div class="right">
		<ScoreLegend />
		<TimeLineScore {year} />
	</div>
</section>

<style>
	section {
		display: flex;
		min-height: 100vh;
		padding: 5rem;
	}

	.left {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	section div:nth-of-type(odd) {
		flex: 0.5;
	}
	section > div {
		flex: 1;
	}
</style>

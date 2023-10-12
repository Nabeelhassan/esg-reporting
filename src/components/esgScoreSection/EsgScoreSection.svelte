<script lang="ts">
	import EsgScoreText from './scoreContent/ESGScoreText.svelte';
	import EsgScoreMeter from './scoreContent/ESGScoreMeter.svelte';
	import SpinPlotContainer from './spinPlot/SpinPlotContainer.svelte';
	import TimeLineScore from '../TimeLineScore.svelte';
	import ScoreLegend from './scoreContent/ScoreLegend.svelte';
	import PillarLegend from '../PillarLegend.svelte';
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
			<p>
				{content}
			</p>
		</div>
		<div class="timeline-container">
			<TimeLineScore {year} />
		</div>
	</div>
	<div>
		<SpinPlotContainer {companyData} {count} {year} />
	</div>
	<div class="right">
		<ScoreLegend />
		<PillarLegend />
	</div>
</section>

<style>
	section {
		display: flex;
		min-height: 100vh;
		padding: 5rem;
	}
	.title-container p {
		margin-top: 2rem;
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
	.timeline-container {
		height: 100%;
		padding-top: 2rem;
	}
	section > div:nth-of-type(odd) {
		flex: 1 1 50%;
	}
	section > div {
		flex: 1 1 100%;
	}
</style>

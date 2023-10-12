<script lang="ts">
	import { onMount } from 'svelte';
	import LegendArrows from './LegendArrows.svelte';
	import ScoreLegendSVG from './ScoreLegendSVG.svelte';
	let svg;
	onMount;
</script>

<section>
	<ScoreLegendSVG bind:this={svg} />
</section>

<style>
	section {
		flex: 1;
		height: 100%;
		margin-bottom: 2rem;
		display: flex;
		justify-content: center;
	}

	p {
		margin-top: 1rem;
		position: relative;
		text-align: center;
	}
	p > span {
		display: block;
		width: 100%;
	}
	.company-score {
		width: calc(10rem - 3rem);
		position: relative;
	}
	.company-score span::before {
		content: '';
		position: absolute;
		width: 1px;
		background-color: white;
		height: 100px;
		bottom: 2.2rem;
		left: 0;
	}
	.company-target {
		position: relative;
		width: 10rem;
	}
	.company-target span::before {
		content: '';
		position: absolute;
		width: 1px;
		background-color: white;
		height: 225px;
		bottom: 2.2rem;
		left: 2px;
	}
</style>

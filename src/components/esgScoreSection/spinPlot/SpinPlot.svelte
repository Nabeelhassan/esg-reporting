<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { writable } from 'svelte/store';
	let container;
	let svg;
	export let companyData;
	export let year;
	export let count;
	export let maxWidth;
	export let allCompanies;
	$: width = 0;
	$: height = 0;
	$: margin = { top: 0, right: 0, bottom: 0, left: 0 };
	$: rotation = 0;
	$: newestData = [
		{
			group: '',
			x: 0,
			value: 0
		}
	];
	$: newData = [
		{
			group: '',
			x: 0,
			value: 0
		}
	];
	$: y = () => 0;
	$: x = () => 0;
	$: color = () => '';
	$: realData = [];
	$: areaGenerator1 = () => 0;
	$: maxData = [
		{
			group: '',
			x: 0,
			value: 0
		}
	];
	const currentData = writable({ name: undefined, value: null });
	const imports = {
		SpinBarsContainer: () => import('./SpinBarsContainer.svelte'),
		SpinPath: () => import('./SpinPath.svelte')
	};
	onMount(async () => {
		// set the dimensions and margins of the graph
		if (!container) return;
		const aspectRatio = 710.01 / 446.09;

		margin = {
			top: allCompanies ? 0 : 8,
			right: allCompanies ? 32 : 54,
			bottom: allCompanies ? 0 : 8,
			left: allCompanies ? 32 : 54
		};

		width = container.offsetWidth / aspectRatio - margin.right - margin.left;
		if (maxWidth) maxWidth.set(width);
		height = container.offsetWidth - margin.top - margin.bottom;
		const maxRotate = 30;
		rotation = -maxRotate + companyData.score.ESG[year] * maxRotate;

		const groups = ['Environment', 'Social', 'Governance'];
		realData = [
			{
				climateChange: roundToDecimal(
					companyData.score.categoryScores.climateChange[year] / 4,
					10000
				),
				waterAndMarineSources: roundToDecimal(
					companyData.score.categoryScores.waterAndMarineSources[year] / 4,
					10000
				),
				biodiversityAndEcosystems: roundToDecimal(
					companyData.score.categoryScores.biodiversityAndEcosystems[year] / 4,
					10000
				),
				resourceUseAndCircularEconomy: roundToDecimal(
					companyData.score.categoryScores.resourceUseAndCircularEconomy[year] / 4,
					10000
				),
				group: 'environment',
				x: 0.5
			},
			{
				ownWorkforce: companyData.score.categoryScores.ownWorkforce[year] / 1,
				group: 'social',
				x: 0.6
			},
			{
				businessConduct: companyData.score.Governance[year] / 1,
				group: 'governance',
				x: 0.7
			}
		];

		// color palette = one color per subgroup
		color = d3.scaleOrdinal().domain(groups).range(['#BCDA7E', '#6257E2', '#2AC28B']);

		x = d3.scaleLinear().domain([-0.5, 0.5]).range([0, width]);

		y = d3.scaleLinear().domain([0, 1]).range([0, height]);

		newestData = [
			{
				group: 'environment',
				x: 0.5,
				value:
					(companyData.score.categoryScores.climateChange[year] +
						companyData.score.categoryScores.waterAndMarineSources[year] +
						companyData.score.categoryScores.resourceUseAndCircularEconomy[year] +
						companyData.score.categoryScores.biodiversityAndEcosystems[year]) /
					8
			},
			{
				group: 'social',
				x: 0.6,
				value: companyData.score.Social[year] / 2
			},
			{
				group: 'governance',
				x: 0.7,
				value: companyData.score.Governance[year] / 2
			}
		];
		newData = [
			{
				group: 'startSvg',
				x: 0,
				value: 0.04
			},
			{
				group: 'endStick',
				x: 0.3,
				value: 0.02
			},
			{
				group: 'endStick',
				x: 0.4,
				value: 0.05
			},
			{
				group: 'environment',
				x: 0.55,
				value:
					(companyData.score.categoryScores.climateChange[year] +
						companyData.score.categoryScores.waterAndMarineSources[year] +
						companyData.score.categoryScores.resourceUseAndCircularEconomy[year] +
						companyData.score.categoryScores.biodiversityAndEcosystems[year]) /
					8
			},
			{
				group: 'social',
				x: 0.65,
				value: companyData.score.Social[year] / 2
			},
			{
				group: 'governance',
				x: 0.75,
				value: companyData.score.Governance[year] / 2
			},
			{
				group: 'end1',
				x: 0.9,
				value: 0.025
			},
			{
				group: 'end2',
				x: 1,
				value: 0
			}
		];
		maxData = [
			{
				group: 'startSvg',
				x: 0,
				value: 0.04
			},
			{
				group: 'endStick',
				x: 0.3,
				value: 0.02
			},
			{
				group: 'endStick',
				x: 0.4,
				value: 0.05
			},
			{
				group: 'environment',
				x: 0.55,
				value: 1 / 2
			},
			{
				group: 'social',
				x: 0.65,
				value: 1 / 2
			},
			{
				group: 'governance',
				x: 0.75,
				value: 1 / 2
			},
			{
				group: 'end1',
				x: 0.9,
				value: 0.025
			},
			{
				group: 'end2',
				x: 1,
				value: 0
			}
		];
		areaGenerator1 = d3
			.area()
			.x0((d) => x(d.value))
			.x1((d) => x(-d.value))
			.y((d) => {
				return y(d.x);
			})
			.curve(d3.curveCatmullRom.alpha(1));
	});
	function roundToDecimal(num, decimal) {
		return Math.round((num + Number.EPSILON) * decimal) / decimal;
	}
</script>

<div class="viz-container" bind:this={container}>
	<svg
		bind:this={svg}
		width={width + margin.left + margin.right}
		height={height + margin.bottom + margin.top}
	>
		<linearGradient id="Gradient" x1="0%" x2="0%" y1="0%" y2="100%"
			><stop offset="0%" stop-color="#E9E2D7" /><stop offset="35%" stop-color="#E9E2D7" /><stop
				offset="55%"
				stop-color="#C1DC86"
			/><stop offset="65%" stop-color="#6960DC" /><stop offset="80%" stop-color="#33C58F" /><stop
				offset="88%"
				stop-color="#E9E2D7"
			/><stop offset="100%" stop-color="#E9E2D7" /></linearGradient
		>
		<g
			style="trandsform-box: fill-box; transform-origin: center"
			transform="translate({margin.left} {margin.top})"
		>
			{#await imports['SpinPath']() then module}
				<svelte:component
					this={module.default}
					{newData}
					{maxData}
					{areaGenerator1}
					allCompanies={allCompanies && companyData.name === 'Nike'}
				/>
			{/await}

			{#await imports['SpinBarsContainer']() then module}
				<!-- Bar chart -->
				<svelte:component
					this={module.default}
					{count}
					{newestData}
					{color}
					{realData}
					{container}
					{width}
					{height}
					{currentData}
				/>
			{/await}
		</g>
	</svg>
	<div class="tooltip-container" style="width: {width}px; height: {height}px">
		{#if $currentData.name}
			<div class="tooltip" style="--left: {$currentData.x}px; --top: {$currentData.y}px">
				<p>{$currentData.name}</p>
				<p>score: {$currentData.value}/1</p>
			</div>
		{/if}
	</div>
</div>

<style>
	div.viz-container {
		width: 100%;
		display: flex;
		justify-content: center;
		flex: 1 1 100%;
	}
	div.viz-container > :global(svg .spinner) {
		transition: opacity 0.3s ease;
	}

	div.viz-container > :global(svg mask > path) {
		transform: scaleX(0.01);
		transition: all 0.3s linear;
		opacity: 0;
	}
	div.viz-container > :global(svg .barchart-lines) {
		opacity: 0;
	}
	div.viz-container > :global(svg:hover mask > path) {
		opacity: 1;
		transform: scaleX(1);
	}
	div.viz-container > :global(svg:hover .barchart-lines) {
		opacity: 1;
		transform: scaleX(1);
		transition: opacity 0.3s linear 0.3s;
	}
	div.viz-container > :global(svg:hover .spinner) {
		opacity: 0.6;
	}
	div.viz-container :global(.barchart) {
		transform-box: fill-box;
		transform-origin: center;
		position: relative;
		z-index: 1;
	}
	div.viz-container :global(.barchart-target) {
		position: relative;
		z-index: 0;
	}
	div.viz-container :global(.barchart-rect) {
		position: relative;
		z-index: 1;
	}
	div.viz-container :global(.barchart-rect-target) {
		position: relative;
		z-index: 0;
	}
	div.tooltip {
		position: absolute;
		top: var(--top);
		left: var(--left);
		pointer-events: none;
		background-color: white;
		padding: 1rem;
		border-radius: 10px;
		transform: translateY(-80%) translateX(-50%);
		width: 100%;
		text-align: center;
	}
	div.tooltip::after {
		position: absolute;
		content: '';
		width: 0;
		height: 0;
		bottom: 1px;
		left: 50%;
		transform: translate(-50%, 100%);
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 10px solid white;
		z-index: 3000;
	}
	div.tooltip > p {
		color: var(--theme-color);
		margin: 0;
	}
	.tooltip-container {
		height: 100%;
		width: 100%;
		position: absolute;
		pointer-events: none;
	}
</style>

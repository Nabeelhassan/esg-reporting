<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	let container;
	export let companyData;
	export let count;
	export let year;

	onMount(() => {
		function createSpinPlot() {
			// set the dimensions and margins of the graph
			var margin = { top: 20, right: 40, bottom: 20, left: 40 };
			const aspectRatio = 446 / 710;
			let height = container.offsetHeight - margin.top - margin.bottom;
			let width = container.offsetHeight * aspectRatio - margin.right - margin.left;

			// append the svg object to the body of the page
			var svg = d3
				.select(container)
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.attr('style', 'background-color: transparent')
				.append('g');

			// List of subgroups = header of the csv files = soil condition here
			const subgroupsEnvironment = [
				'climateChange',
				'waterAndMarineSources',
				'biodiversityAndEcosystems',
				'resourceUseAndCircularEconomy'
			];
			const subgroupsSocial = ['ownWorkforce'];
			const subgroupsGovernance = ['businessConduct'];
			const groups = ['Environment', 'Social', 'Governance'];
			const realData = [
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
					x: 0.2
				},
				{
					ownWorkforce: companyData.score.categoryScores.ownWorkforce[year] / 1,
					group: 'social',
					x: 0.3
				},
				{
					businessConduct: companyData.score.Governance[year] / 1,
					group: 'governance',
					x: 0.4
				}
			];
			const maxData = [
				{
					climateChange: 1 / 4,
					waterAndMarineSources: 1 / 4,
					biodiversityAndEcosystems: 1 / 4,
					resourceUseAndCircularEconomy: 1 / 4,
					group: 'environment',
					x: 0.2
				},
				{
					ownWorkforce: 1,
					group: 'social',
					x: 0.3
				},
				{
					businessConduct: 1,
					group: 'governance',
					x: 0.4
				}
			];

			// color palette = one color per subgroup
			var color = d3.scaleOrdinal().domain(groups).range(['#BCDA7E', '#6257E2', '#2AC28B']);

			function createStackedBarchart(subgroups, pillar, index) {
				const preStackedData = d3.stack().keys(subgroups)(realData);

				const stackedData = preStackedData.map((item) =>
					item.filter((innerItem, i) => index === i)
				);
				// Add Y axis
				let y = d3.scaleLinear().domain([0, 1]).range([0, height]);

				// Add X axis
				let x = d3.scaleLinear().domain([-0.5, 0.5]).range([0, width]);
				const newestData = [
					{
						group: 'environment',
						x: 0.2,
						value:
							(companyData.score.categoryScores.climateChange[year] +
								companyData.score.categoryScores.waterAndMarineSources[year] +
								companyData.score.categoryScores.resourceUseAndCircularEconomy[year] +
								companyData.score.categoryScores.biodiversityAndEcosystems[year]) /
							8
					},
					{
						group: 'social',
						x: 0.3,
						value: companyData.score.Social[year] / 2
					},
					{
						group: 'governance',
						x: 0.4,
						value: companyData.score.Governance[year] / 2
					}
				];
				const useData = newestData.find((item) => item.group === pillar);

				const defs = svg.append('defs');
				const maxRotate = 30;
				const rotation = -maxRotate + useData.value * 2 * maxRotate;
				defs
					.append('mask')
					.attr('id', useData.group + count)
					.append('path')
					.attr('class', 'barchart')
					.datum(useData)
					.attr('d', (d) => {
						const yCoor0 = y(d.x);
						const pathHeight = y(0.1);

						const hCalc = x(d.value) - x(-d.value);
						const cornerRadius = Math.min(hCalc, pathHeight) / 2;

						const stringWithoutCornerRadius = `
										M${x(-d.value) + cornerRadius},${yCoor0}
										h${hCalc - cornerRadius * 2}
										a${cornerRadius},${cornerRadius} 0 0 1
										${cornerRadius},${cornerRadius}
										v${pathHeight - cornerRadius * 2}
										a${cornerRadius},${cornerRadius} 0 0 1
							 			-${cornerRadius},${cornerRadius}
										h-${hCalc - cornerRadius * 2}
										a${cornerRadius},${cornerRadius} 0 0 1
							 			-${cornerRadius},-${cornerRadius}
										v${y(-0.1) + cornerRadius * 2}
										a${cornerRadius},${cornerRadius} 0 0 1
										${cornerRadius},-${cornerRadius}
									`;
						return stringWithoutCornerRadius;
					})
					.attr('fill', 'white');

				svg
					.append('g')
					.attr('class', `barchart`)
					.style('--rotation', `${rotation}deg`)
					.selectAll('g')
					// Enter in the stack data = loop key per key = group per group
					.data(stackedData)
					.enter()
					.append('g')
					.selectAll('rect')
					// enter a second time = loop subgroup per subgroup to add all rectangles
					.data(function (d) {
						return d;
					})
					.enter()
					.append('rect')
					.attr('class', 'barchart-rect')
					.attr('mask', (d) => `url(#${d.data.group + count})`)
					.attr('y', function (d) {
						return y(d.data.x);
					})
					.attr('fill', function (d) {
						return color(d.data.group);
					})
					.attr('x', function (d) {
						let newData;
						if (d.data.group === 'environment') {
							newData = {
								climateChange: d.data.climateChange / 2,
								biodiversityAndEcosystems: d.data.biodiversityAndEcosystems / 2,
								waterAndMarineSources: d.data.waterAndMarineSources / 2,
								resourceUseAndCircularEconomy: d.data.resourceUseAndCircularEconomy / 2
							};
						}
						if (d.data.group === 'social') {
							newData = {
								ownWorkforce: d.data.ownWorkforce / 2
							};
						}
						if (d.data.group === 'governance') {
							newData = {
								businessConduct: d.data.businessConduct / 2
							};
						}

						const values = Object.values(newData).filter((item) => typeof item !== 'string');
						const max = values.reduce((a, b) => a + b, 0);
						return x(d[0] - max);
					})
					.attr('width', function (d) {
						return x(d[1]) - x(d[0]);
					})
					.attr('height', y(0.1));

				svg
					.append('g')
					.attr('class', `barchart`)
					.style('--rotation', `${rotation}deg`)
					.selectAll('g')
					// Enter in the stack data = loop key per key = group per group
					.data(stackedData.slice(0, -1))
					.enter()
					.append('g')
					.selectAll('rect')
					// enter a second time = loop subgroup per subgroup to add all rectangles
					.data(function (d) {
						return d;
					})
					.enter()
					.append('rect')
					.attr('mask', (d) => `url(#${d.data.group + count + 'target'})`)
					.attr('y', function (d) {
						return y(d.data.x);
					})
					.attr('class', 'barchart-rect')
					.attr('x', function (d) {
						let newData;
						if (d.data.group === 'environment') {
							newData = {
								climateChange: d.data.climateChange / 2,
								biodiversityAndEcosystems: d.data.biodiversityAndEcosystems / 2,
								waterAndMarineSources: d.data.waterAndMarineSources / 2,
								resourceUseAndCircularEconomy: d.data.resourceUseAndCircularEconomy / 2
							};
						}
						if (d.data.group === 'social') {
							newData = {
								ownWorkforce: d.data.ownWorkforce / 2
							};
						}
						if (d.data.group === 'governance') {
							newData = {
								businessConduct: d.data.businessConduct / 2
							};
						}
						const values = Object.values(newData).filter((item) => typeof item !== 'string');
						const max = values.reduce((a, b) => a + b, 0);
						return x(d[1] - max);
					})
					.attr('width', function (d) {
						return 1;
					})
					.attr('height', y(0.1));
			}
			function createStackedBarchartTargets(subgroups, pillar, index) {
				const preStackedData = d3.stack().keys(subgroups)(realData);
				const preMaxStackedData = d3.stack().keys(subgroups)(maxData);

				const stackedData = preStackedData.map((item) =>
					item.filter((innerItem, i) => index === i)
				);
				const maxStackedData = preMaxStackedData.map((item) =>
					item.filter((innerItem, i) => index === i)
				);
				// Add Y axis
				let y = d3.scaleLinear().domain([0, 1]).range([0, height]);

				// Add X axis
				let x = d3.scaleLinear().domain([-0.5, 0.5]).range([0, width]);
				const newestData = [
					{
						group: 'environment',
						x: 0.2,
						value: companyData.score.Environment / 2
					},
					{
						group: 'social',
						x: 0.3,
						value: companyData.score.Social[year] / 2
					},
					{
						group: 'governance',
						x: 0.4,
						value: companyData.score.Governance[year] / 2
					}
				];

				const newestMaxData = [
					{
						group: 'environment',
						x: 0.2,
						value: 1 / 2
					},
					{
						group: 'social',
						x: 0.3,
						value: 1 / 2
					},
					{
						group: 'governance',
						x: 0.4,
						value: 1 / 2
					}
				];
				const useMaxData = newestMaxData.find((item) => item.group === pillar);

				const defs = svg.append('defs');
				svg
					.append('g')
					.attr('class', `barchart-target`)
					.selectAll('g')
					// Enter in the stack data = loop key per key = group per group
					.data(maxStackedData)
					.enter()
					.append('g')
					.selectAll('rect')
					// enter a second time = loop subgroup per subgroup to add all rectangles
					.data(function (d) {
						return d;
					})
					.enter()
					.append('rect')
					.attr('class', 'barchart-rect-target')
					.attr('mask', (d) => `url(#${d.data.group + count + 'target'})`)
					.attr('y', function (d) {
						return y(d.data.x);
					})
					.attr('fill', function (d) {
						return color(d.data.group);
					})
					.attr('x', function (d) {
						let newData;
						if (d.data.group === 'environment') {
							newData = {
								climateChange: d.data.climateChange / 2,
								biodiversityAndEcosystems: d.data.biodiversityAndEcosystems / 2,
								waterAndMarineSources: d.data.waterAndMarineSources / 2,
								resourceUseAndCircularEconomy: d.data.resourceUseAndCircularEconomy / 2
							};
						}
						if (d.data.group === 'social') {
							newData = {
								ownWorkforce: d.data.ownWorkforce / 2
							};
						}
						if (d.data.group === 'governance') {
							newData = {
								businessConduct: d.data.businessConduct / 2
							};
						}

						const values = Object.values(newData).filter((item) => typeof item !== 'string');
						const max = values.reduce((a, b) => a + b, 0);
						return x(d[0] - max);
					})
					.attr('width', function (d) {
						return x(d[1]) - x(d[0]);
					})
					.attr('height', y(0.1))
					.style('opacity', 0.3);
				defs
					.append('mask')
					.attr('id', useMaxData.group + count + 'target')
					.append('path')
					.attr('class', 'barchart-target')
					.datum(useMaxData)
					.attr('d', (d) => {
						const yCoor0 = y(d.x);
						const pathHeight = y(0.1);

						const hCalc = x(d.value) - x(-d.value);
						const cornerRadius = Math.min(hCalc, pathHeight) / 2;

						const stringWithoutCornerRadius = `
										M${x(-d.value) + cornerRadius},${yCoor0}
										h${hCalc - cornerRadius * 2}
										a${cornerRadius},${cornerRadius} 0 0 1
										${cornerRadius},${cornerRadius}
										v${pathHeight - cornerRadius * 2}
										a${cornerRadius},${cornerRadius} 0 0 1
							 			-${cornerRadius},${cornerRadius}
										h-${hCalc - cornerRadius * 2}
										a${cornerRadius},${cornerRadius} 0 0 1
							 			-${cornerRadius},-${cornerRadius}
										v${y(-0.1) + cornerRadius * 2}
										a${cornerRadius},${cornerRadius} 0 0 1
										${cornerRadius},-${cornerRadius}
									`;
						return stringWithoutCornerRadius;
					})
					.attr('fill', 'white');
			}
			createStackedBarchartTargets(subgroupsEnvironment, 'environment', 0);
			createStackedBarchartTargets(subgroupsSocial, 'social', 1);
			createStackedBarchartTargets(subgroupsGovernance, 'governance', 2);
			createStackedBarchart(subgroupsEnvironment, 'environment', 0);
			createStackedBarchart(subgroupsSocial, 'social', 1);
			createStackedBarchart(subgroupsGovernance, 'governance', 2);
		}
		createSpinPlot();
	});
	function roundToDecimal(num, decimal) {
		return Math.round((num + Number.EPSILON) * decimal) / decimal;
	}
</script>

<div class="viz-container" bind:this={container} />
<p>{companyData.name}</p>

<style>
	div.viz-container {
		height: 100%;
		display: flex;
		justify-content: center;
		width: 100%;
		min-height: 20vh;
	}

	:global(.barchart) {
		transform-box: fill-box;
		transform-origin: center;
		animation: 1s forwards grow;
		position: relative;
		z-index: 1;
	}
	:global(.barchart-target) {
		position: relative;
		z-index: 0;
	}
	:global(.barchart-rect) {
		position: relative;
		z-index: 1;
	}
	:global(.barchart-rect-target) {
		position: relative;
		z-index: 0;
	}
	@keyframes grow {
		0% {
			transform: scaleX(0);
		}
		75% {
			transform: scaleX(1);
		}
		100% {
			transform: rotate(var(--rotation));
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	export let data;
	export let container;
	export let companyData;
	export let pathData;
	console.log(data.data);

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
				// .attr('preserveAspectRatio', 'none')
				.attr('style', 'background-color: transparent')
				.append('g');

			// List of subgroups = header of the csv files = soil condition here
			const realData = data.data;
			var subgroups = realData.map((item) =>
				Object.keys(item).filter((item) => item !== 'group' && item !== 'x')
			)[0];

			// List of groups = species here = value of the first column called group -> I show them on the X axis
			const groups = realData.map((d) => d.group);

			// Add X axis
			// Add Y axis
			let x = d3.scaleLinear().domain([-0.75, 0.75]).range([0, width]);

			var yv = d3.scaleLinear().domain([0, 1]).range([0, height]);
			const areaGenerator1 = d3
				.area()
				.x0((d) => x(d.value))
				.x1((d) => x(-d.value))
				.y((d) => {
					return yv(d.x);
				})
				.curve(d3.curveCatmullRom.alpha(1));

			// color palette = one color per subgroup
			var color = d3.scaleOrdinal().domain(groups).range(['#BFDB85', '#6257E2', '#2AC28B']);

			//stack the data? --> stack per subgroup
			var stackedData = d3.stack().keys(subgroups)(realData);
			const newData = [
				{
					group: 'startSvg',
					x: 0,
					value: 0.1
				},
				{
					group: 'endStick',
					x: 0.3,
					value: 0.025
				},
				{
					group: 'endStick',
					x: 0.4,
					value: 0.05
				},
				{
					group: 'environment',
					x: 0.55,
					value: pathData.environment
				},
				{
					group: 'social',
					x: 0.65,
					value: pathData.social
				},
				{
					group: 'governance',
					x: 0.75,
					value: pathData.governance
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

			const linearGradient = svg.append('linearGradient').attr('id', 'Gradient');
			linearGradient.attr('x1', '0%');
			linearGradient.attr('x2', '0%');
			linearGradient.attr('y1', '0%');
			linearGradient.attr('y2', '100%');
			linearGradient.append('stop').attr('offset', '0%').attr('stop-color', '#E9E2D7');
			linearGradient.append('stop').attr('offset', '35%').attr('stop-color', '#E9E2D7');
			linearGradient.append('stop').attr('offset', '55%').attr('stop-color', '#C1DC86');
			linearGradient.append('stop').attr('offset', '65%').attr('stop-color', '#6960DC');
			linearGradient.append('stop').attr('offset', '80%').attr('stop-color', '#33C58F');
			linearGradient.append('stop').attr('offset', '88%').attr('stop-color', '#E9E2D7');
			linearGradient.append('stop').attr('offset', '100%').attr('stop-color', '#E9E2D7');
			const maxData = newData.map((item) =>
				item.group === 'environment' || item.group === 'governance'
					? {
							...item,
							value: 0.6
					  }
					: item.group === 'social'
					? { ...item, value: 0.6 }
					: { ...item }
			);

			function createStackedBarchart() {
				// Add Y axis
				let y = d3.scaleLinear().domain([0, 1]).range([0, height]);

				// Add X axis
				let x = d3.scaleLinear().domain([-0.75, 0.75]).range([0, width]);

				// Note: You may need to adjust the x and y domains and ranges according to your specific data and requirements.

				svg
					.append('g')
					.attr('class', 'barchart')
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
					.attr('y', function (d) {
						return y(d.data.x);
					})
					.attr('fill', function (d) {
						return color(d.data.group);
					})
					.attr('stroke', 'black')
					.attr('stroke-dasharray', function (d, i) {})
					.attr('x', function (d) {
						const newData = {
							climateChange: d.data.climateChange,
							pollution: d.data.pollution,
							biodiversityAndEcosystems: d.data.biodiversityAndEcosystems,
							waterAndMarineSources: d.data.waterAndMarineSources,
							resourceUseAndCircularEconomy: d.data.resourceUseAndCircularEconomy
						};
						const values = Object.values(newData).filter((item) => typeof item !== 'string');
						const max = values.reduce((a, b) => a + b, 0) / 2;
						return x(d[0] - max);
					})
					.attr('width', function (d) {
						return x(d[1]) - x(d[0]);
					})
					.attr('height', y(0.1));

				// Note: You may also need to adjust other attributes and data mappings based on your specific data and requirements.
			}

			svg
				.append('path')
				.datum(newData)
				.attr('class', 'spinner')
				.attr('d', areaGenerator1)
				.attr('fill', 'url(#Gradient)')
				.attr('opacity', 1);
			svg
				.append('path')
				.datum(maxData)
				.attr('class', 'spinner')
				.attr('d', areaGenerator1)
				.attr('fill-opacity', '0')
				.attr('stroke', 'black')
				.attr('stroke-dasharray', '4')
				.attr('opacity', 1);
			// Show the bars
			createStackedBarchart();

			svg
				.append('path')
				.datum(newData)
				.attr('class', 'Ispinner')
				.attr('d', areaGenerator1)
				.attr('opacity', 0);
		}
		createSpinPlot();
	});
</script>

<div class="viz-container" bind:this={container} />

<style>
	div.viz-container {
		height: 100%;
		display: flex;
		justify-content: center;
	}
	:global(.barchart) {
		transition: 0.3s opacity ease;
		opacity: 0;
	}
	:global(svg .spinner) {
		opacity: 1;
		transition: 0.3s opacity ease;
	}

	:global(svg:has(.Ispinner:hover) .spinner) {
		opacity: 0.8;
	}
	:global(svg:has(.Ispinner:hover) .barchart) {
		opacity: 1;
	}
</style>

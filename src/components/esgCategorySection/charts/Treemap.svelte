<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	export let data;
	export let pillarColor;
	let treemapContainer;

	onMount(() => {
		const width = treemapContainer.offsetWidth;
		const height = treemapContainer.offsetHeight;
		const chart = () => {
			let data = {
				name: 'GHG scopes',
				children: [
					{
						name: 'GHG scope 1',
						value: 50868
					},
					{
						name: 'GHG scope 2',
						value: 24900
					},
					{
						name: 'GHG scope 3',
						children: [
							{
								name: 'Purchased goods and services',
								value: 8476358
							},
							{
								name: 'Fuel and energy-related activities',
								value: 15062
							},
							{
								name: 'Waste generated in operations',
								value: 1999
							},
							{
								name: 'Use of sold products',
								value: 7968735
							},
							{
								name: 'End-of-life treatment of sold products',
								value: 618851
							},
							{
								name: 'Upstream transportation and distribution',
								value: 644305
							},
							{
								name: 'Downstream transportation and distribution',
								value: 85146
							},
							{
								name: 'Business travels',
								value: 13297
							},
							{
								name: 'Employee commuting',
								value: 98473
							}
						]
					}
				]
			};

			const root = treemap(data, width, height);
			const color = d3.scaleOrdinal(['#BCDA7F', '#D5E4B6', '#E7F1D3']);

			const svg = d3
				.select(treemapContainer)
				.append('svg')
				.attr('viewBox', [0, 0, width, height])
				.style('font', '10px sans-serif')
				.style('background-color', 'black');

			const leaf = svg
				.selectAll('g')
				.data(root.leaves())
				.join('g')
				.attr('transform', (d) => `translate(${d.x0},${d.y0})`);

			leaf
				.append('rect')
				// .attr('id', (d) => (d.leafUid = DOM.uid('leaf')).id)
				.attr('fill', (d) => {
					while (d.depth > 1) d = d.parent;
					return color(d.data.name);
				})
				.attr('fill-opacity', 1)
				.attr('width', (d) => d.x1 - d.x0)
				.attr('height', (d) => d.y1 - d.y0);

			leaf
				.append('text')
				.datum((d) => d.data.name)
				.attr('y', 16)
				.attr('x', 16)
				.text((d) => d);

			return svg.node();
		};

		function treemap(data, width, height) {
			return d3.treemap().size([width, height]).padding(1).round(true)(
				d3
					.hierarchy(data)
					.sum((d) => d.value)
					.sort((a, b) => b.value - a.value)
			);
		}
		chart();
	});
</script>

<section bind:this={treemapContainer} />

<style>
	section {
		height: 100vh;
	}
</style>

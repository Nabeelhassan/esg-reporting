<script lang="ts">
	import { getContext, onMount } from 'svelte';
	// import data from '../dummyData.json';
	import dummyDataCompanies from '../../dummy-data-companies.json';
	import { BubbleChart } from '../../helpers/BubbleChart';
	import * as d3 from 'd3';
	export let data;
	const dummyData = [];
	let svgContainer;

	onMount(() => {
		const minPixelsCircles = 4;

		const pixelsNeeded = dummyDataCompanies.length / minPixelsCircles;
		const windowWidth = window.innerWidth;
		const width = windowWidth > pixelsNeeded ? windowWidth : pixelsNeeded;
		const chart = BubbleChart(dummyDataCompanies, {
			label: (d) => `${d.company}`,
			value: (d) => d.scale,
			group: (d) => (d.score > 66 ? 'good' : d.score > 33 ? 'mid' : 'bad'),
			title: (d) => `${d.company}`,
			link: (d) => `${d.company}`,
			width: width,
			svgContainer: svgContainer
		});
	});
</script>

<div bind:this={svgContainer} />

<style>
	:global(svg) {
		background-color: rgb(250, 250, 250);
	}

	:global(#title) {
		font-weight: 700;
		font-size: x-large;
	}

	:global(text.tiny) {
		font-size: 10pt;
	}
	:global(text.light) {
		fill: lightgrey;
	}

	:global(.world) {
		stroke: lightgrey;
		stroke-width: 4px;
	}

	:global(.cell) {
		stroke: white;
		stroke-width: 1px;
	}

	:global(.label) {
		text-anchor: middle;
		fill: white;
	}

	:global(.label > .name) {
		dominant-baseline: text-after-edge;
	}

	:global(.label > .value) {
		dominant-baseline: text-before-edge;
	}

	:global(.hoverer) {
		fill: transparent;
		stroke: white;
		stroke-width: 0px;
	}

	:global(.hoverer:hover) {
		stroke-width: 3px;
	}

	:global(.legend-color) {
		stroke-width: 1px;
		stroke: darkgrey;
	}
</style>

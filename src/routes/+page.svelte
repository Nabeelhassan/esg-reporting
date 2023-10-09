<script lang="ts">
	export let data;
	import CompanyRankingSection from '../components/sections/CompanyRankingSection.svelte';
	import EsgScoreSection from '../components/esgScoreSection/EsgScoreSection.svelte';
	import LandSection from '../components/landSection/LandSection.svelte';
	import { writable } from 'svelte/store';
	const count = writable(0);

	// const pillars = data.data.map((item) => item.group);
	const nike = data.data.find((company) => company.name === 'Nike');
	const currentYear = '2026';
	const nonPillar = ['ESG', 'categoryScores'];
	const pillars = Object.keys(nike.score).filter((item) => !nonPillar.includes(item));
	const summedPillarScores =
		nike.score.Environment[currentYear] +
		nike.score.Social[currentYear] +
		nike.score.Governance[currentYear];

	console.log(pillars);
	const gradientValues = pillars.map(
		(pillar) => (nike.score[pillar][currentYear] / summedPillarScores) * 100
	);

	const radialGradientString = `conic-gradient(#BCDA7E 5% ${gradientValues[0] * 0.9}%, #6257E2  ${
		gradientValues[0] * 1.1
	}% ${(gradientValues[0] + gradientValues[1]) * 0.9}%, #2AC28B ${
		(gradientValues[0] + gradientValues[1]) * 1.1
	}% 95%, #BCDA7E 100%)`;

	const contentPast = 'This is Nikes 2025 ESG industry impact score.';
	const contentPresent = 'This is Nikes 2026 ESG industry impact score.';
	const contentFuture = 'This is Nikes 2030 targeted ESG industry impact score.';
	const nikeContent = {
		tag: 'Our purpose is to move the world forward through the power of sport'
	};
</script>

<LandSection companyData={nike} {data} {radialGradientString} year={'2025'} content={nikeContent} />

<EsgScoreSection companyData={nike} content={contentPast} {count} year={'2025'} />

<EsgScoreSection companyData={nike} content={contentPresent} {count} year={'2026'} />

<EsgScoreSection companyData={nike} content={contentFuture} {count} year={'2030'} />

<!-- <CompanyRankingSection {data} year={'2026'} {count} /> -->

<!--

 -->

<style>
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

<script lang="ts">
	export let data;
	import EsgScoreSection from '../components/sections/EsgScoreSection.svelte';
	import LandSection from '../components/sections/LandSection.svelte';
	import AllCompanies from '../components/sections/AllCompanies.svelte';

	const sumValues = data.data.map((item) => {
		const newData = {
			climateChange: item.climateChange,
			pollution: item.pollution,
			biodiversityAndEcosystems: item.biodiversityAndEcosystems,
			waterAndMarineSources: item.waterAndMarineSources,
			resourceUseAndCircularEconomy: item.resourceUseAndCircularEconomy
		};
		const values = Object.values(newData);
		const sum = values.reduce((a, b) => a + b, 0);

		return { group: item.group, value: sum };
	});
	const pillarScoreValues = sumValues.map((item) => item.value);
	const summedScores = pillarScoreValues.reduce((a, b) => a + b, 0);
	const newScoreValues = pillarScoreValues.map((item) => (item / summedScores) * 100);
	const esgScore = roundToTwo(summedScores / pillarScoreValues.length);
	const radialGradientString = `conic-gradient(#33C58F 5% ${newScoreValues[0] * 0.9}%, #6960DC  ${
		newScoreValues[0] * 1.1
	}% ${(newScoreValues[0] + newScoreValues[1]) * 0.9}%, #C1DC86 ${
		(newScoreValues[0] + newScoreValues[1]) * 1.1
	}% 95%, #33C58F 100%)`;
	function createCompanyData(data) {
		const sumValues = data.data.map((item) => {
			const newData = {
				climateChange: item.climateChange,
				pollution: item.pollution,
				biodiversityAndEcosystems: item.biodiversityAndEcosystems,
				waterAndMarineSources: item.waterAndMarineSources,
				resourceUseAndCircularEconomy: item.resourceUseAndCircularEconomy
			};
			const values = Object.values(newData);
			const sum = values.reduce((a, b) => a + b, 0);

			return { group: item.group, value: sum };
		});
		const pillarScoreValues = sumValues.map((item) => item.value);
		const summedScores = pillarScoreValues.reduce((a, b) => a + b, 0);
		const newScoreValues = pillarScoreValues.map((item) => (item / summedScores) * 100);
		const esgScore = roundToTwo(summedScores / pillarScoreValues.length);
		const radialGradientString = `conic-gradient(#33C58F 5% ${newScoreValues[0] * 0.9}%, #6960DC  ${
			newScoreValues[0] * 1.1
		}% ${(newScoreValues[0] + newScoreValues[1]) * 0.9}%, #C1DC86 ${
			(newScoreValues[0] + newScoreValues[1]) * 1.1
		}% 95%, #33C58F 100%)`;
		return {
			name: 'Nike',
			tag: 'Our purpose is to move the world forward through the power of sport',
			esgScore: esgScore,
			environmentScore: pillarScoreValues[0],
			socialScore: pillarScoreValues[1],
			governanceScore: pillarScoreValues[2]
		};
	}

	function roundToTwo(num: number) {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}
	const dataPast = {
		data: data.data.map((item) => ({
			...item,
			biodiversityAndEcosystems: item.biodiversityAndEcosystems * 0.5,
			climateChange: item.climateChange * 0.5,
			pollution: item.pollution * 0.5,
			resourceUseAndCircularEconomy: item.resourceUseAndCircularEconomy * 0.5,
			waterAndMarineSources: item.waterAndMarineSources * 0.5
		}))
	};
	const dataFuture = {
		data: data.data.map((item) => ({
			...item,
			biodiversityAndEcosystems:
				item.biodiversityAndEcosystems * 1.5 >= 0.2 ? 0.2 : item.biodiversityAndEcosystems * 1.5,
			climateChange: item.climateChange * 1.5 >= 0.2 ? 0.2 : item.climateChange * 1.5,
			pollution: item.pollution * 1.5 >= 0.2 ? 0.2 : item.pollution * 1.5,
			resourceUseAndCircularEconomy:
				item.resourceUseAndCircularEconomy * 1.5 >= 0.2
					? 0.2
					: item.resourceUseAndCircularEconomy * 1.5,
			waterAndMarineSources:
				item.waterAndMarineSources * 1.5 >= 0.2 ? 0.2 : item.waterAndMarineSources * 1.5
		}))
	};
	const companyDataPast = createCompanyData(dataPast);
	console.log(companyDataPast);
	const companyData = createCompanyData(data);
	const companyDataFuture = createCompanyData(dataFuture);
	const pathDataPast = {
		environment: 0.35 * 0.5 + 0.05,
		social: 0.125 * 0.5 + 0.05,
		governance: 0.5 * 0.5 + 0.05
	};
	const pathDataPresent = {
		environment: 0.7 * 0.5 + 0.1,
		social: 0.25 * 0.5 + 0.1,
		governance: 1 * 0.5 + 0.1
	};
	const pathDataFuture = {
		environment: 0.75 * 0.5 + 0.1,
		social: 0.375 * 0.5 + 0.1,
		governance: 1 * 0.5 + 0.1
	};
	const contentPast = 'This is Nikes 2025 ESG industry impact score.';
	const contentPresent = 'This is Nikes 2026 ESG industry impact score.';
	const contentFuture = 'This is Nikes 2030 targeted ESG industry impact score.';
</script>

<LandSection {companyData} {data} {radialGradientString} />

<EsgScoreSection
	companyData={companyDataPast}
	data={dataPast}
	pathData={pathDataPast}
	content={contentPast}
	year={'2025'}
/>
<EsgScoreSection
	{companyData}
	{data}
	pathData={pathDataPresent}
	content={contentPresent}
	year={'2026'}
/>
<EsgScoreSection
	companyData={companyDataFuture}
	data={dataFuture}
	pathData={pathDataFuture}
	content={contentFuture}
	year={'2030'}
/>

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

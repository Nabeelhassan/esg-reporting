<script lang="ts">
	import { stack, scaleLinear } from 'd3';
	import { onMount } from 'svelte';
	import roundToDecimal from '../../../helpers/roundToDecimal';
	export let pillar;
	export let count;
	export let y;
	export let x;
	export let index;
	export let newestData;
	export let color;
	export let realData;
	export let subgroups;
	export let width;
	export let height;
	export let currentData;
	$: useData = {};
	$: stringWithoutCornerRadius = '';
	$: stackedData = [];
	$: barHeight = 0;
	$: x = 0;
	$: y = 0;
	$: calcXPos = () => 0;
	$: calcXPosLines = () => 0;
	$: counter = 0;

	onMount(() => {
		const preStackedData = stack().keys(subgroups)(realData);
		x = scaleLinear().domain([-0.5, 0.5]).range([0, width]);
		counter = $count;

		y = scaleLinear().domain([0, 1]).range([0, height]);
		stackedData = preStackedData.map((item) => item.filter((innerItem, i) => index === i));

		useData = newestData.find((item) => item.group === pillar);
		const yCoor0 = y(useData.x);
		barHeight = y(0.1);
		const pathHeight = barHeight;

		const hCalc = x(useData.value) - x(-useData.value);
		const cornerRadius = Math.min(hCalc, pathHeight) / 2;
		stringWithoutCornerRadius = `
						M${x(-useData.value) + cornerRadius},${yCoor0}
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
		calcXPos = (rect) => {
			let newData;
			if (rect.data.group === 'environment') {
				newData = {
					climateChange: rect.data.climateChange / 2,
					biodiversityAndEcosystems: rect.data.biodiversityAndEcosystems / 2,
					waterAndMarineSources: rect.data.waterAndMarineSources / 2,
					resourceUseAndCircularEconomy: rect.data.resourceUseAndCircularEconomy / 2
				};
			}
			if (rect.data.group === 'social') {
				newData = {
					ownWorkforce: rect.data.ownWorkforce / 2
				};
			}
			if (rect.data.group === 'governance') {
				newData = {
					businessConduct: rect.data.businessConduct / 2
				};
			}
			if (!newData) return;

			const values = Object.values(newData).filter((item) => typeof item !== 'string');
			const max = values.reduce((a, b) => a + b, 0);
			return x(rect[0] - max);
		};
		calcXPosLines = (rect) => {
			let newData;
			if (rect.data.group === 'environment') {
				newData = {
					climateChange: rect.data.climateChange / 2,
					biodiversityAndEcosystems: rect.data.biodiversityAndEcosystems / 2,
					waterAndMarineSources: rect.data.waterAndMarineSources / 2,
					resourceUseAndCircularEconomy: rect.data.resourceUseAndCircularEconomy / 2
				};
			}
			if (rect.data.group === 'social') {
				newData = {
					ownWorkforce: rect.data.ownWorkforce / 2
				};
			}
			if (rect.data.group === 'governance') {
				newData = {
					businessConduct: rect.data.businessConduct / 2
				};
			}
			if (!newData) return;

			const values = Object.values(newData).filter((item) => typeof item !== 'string');
			const max = values.reduce((a, b) => a + b, 0);
			return x(rect[1] - max);
		};

		count.set($count + 1);
	});
</script>

<!-- Bar chart -->
<defs>
	<mask id={useData ? useData.group + counter : ''}>
		<path class="barchart" d={stringWithoutCornerRadius} fill="white" />
	</mask>
</defs>
<g class="barchart">
	{#each stackedData as g, i}
		{#each g as rect}
			<rect
				class="barchart-rect"
				mask={`url(#${rect.data.group + counter})`}
				y={y(rect.data.x)}
				fill={color(rect.data.group)}
				x={calcXPos(rect)}
				width={x(rect[1]) - x(rect[0])}
				height={barHeight}
				on:mouseenter={() => {
					const exclude = ['group', 'x'];
					const dataKeys = Object.keys(rect.data).filter((item) => !exclude.includes(item));
					const categories = ['Climate Change', 'Pollution', 'Water and marine sources'];
					const newKeys = dataKeys.map((key) => {
						switch (key) {
							case 'climateChange':
								return 'Climate Change';
							case 'waterAndMarineSources':
								return 'Water and marine sources';
							case 'resourceUseAndCircularEconomy':
								return 'Resource use and circular economy';
							case 'biodiversityAndEcosystems':
								return 'Biodiversity and ecosystems';
							case 'ownWorkforce':
								return 'Own workforce';
							case 'businessConduct':
								return 'Business Conduct';
						}
					});
					const width = x(rect[1]) - x(rect[0]);

					currentData.set({
						name: newKeys[i],
						value: roundToDecimal(rect.data[dataKeys[i]], 100),
						x: calcXPos(rect) + width / 2,
						y: y(rect.data.x)
					});
				}}
				on:mouseleave={() => {
					currentData.set({ name: undefined, value: null });
				}}
			/>
		{/each}
	{/each}
</g>
<g class="barchart-lines">
	{#each stackedData.slice(0, -1) as g}
		{#each g as rect}
			<rect
				class="barchart-rect"
				mask={`url(#${rect.data.group + counter})`}
				y={y(rect.data.x)}
				x={calcXPosLines(rect)}
				width="1"
				height={barHeight}
			/>
		{/each}
	{/each}
</g>

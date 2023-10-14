<script lang="ts">
	import { onMount } from 'svelte';
	export let container;
	export let count;
	export let newestData;
	export let color;
	export let realData;
	export let width;
	export let height;
	export let currentData;
	import SpinBar from './SpinBar.svelte';
	const pillars = ['environment', 'social', 'governance'];
	const subgroupsEnvironment = [
		'climateChange',
		'waterAndMarineSources',
		'biodiversityAndEcosystems',
		'resourceUseAndCircularEconomy'
	];
	const subgroupsSocial = ['ownWorkforce'];
	const subgroupsGovernance = ['businessConduct'];

	const subgroups = [subgroupsEnvironment, subgroupsSocial, subgroupsGovernance];
</script>

{#each pillars as pillar, index}
	<SpinBar
		{pillar}
		{index}
		{count}
		{newestData}
		{color}
		subgroups={subgroups[index]}
		{realData}
		{width}
		{height}
		{currentData}
	/>
{/each}

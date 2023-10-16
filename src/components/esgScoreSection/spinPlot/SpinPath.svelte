<script lang="ts">
	import { draw } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let areaGenerator1;
	export let newData;
	export let maxData;
	export let allCompanies;
</script>

<path class="spinner" d={areaGenerator1(newData)} fill="url(#Gradient)" />
{#if allCompanies}
	<path
		class="spinner"
		d={areaGenerator1(newData)}
		stroke="var(--blue-color)"
		stroke-width="4"
		fill="transparent"
	/>
{/if}
<path
	class="spinner-target"
	d={areaGenerator1(maxData)}
	fill="transparent"
	stroke="white"
	stroke-dasharray="5"
	stroke-width="1"
/>

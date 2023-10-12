<script lang="ts">
	import * as d3 from 'd3';
	export let areaGenerator1;
	export let newData;
	export let maxData;
</script>

<path class="spinner" d={areaGenerator1(newData)} fill="url(#Gradient)" />
<path
	class="spinner-target"
	d={areaGenerator1(maxData)}
	fill="transparent"
	stroke="white"
	stroke-dasharray="5"
	stroke-width="1"
/>

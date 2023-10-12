<script lang="ts">
	export let data;
	export let title;
	export let description;
	export let year;
	export let tableContent;
	export let pillarColor;
	import TimeLine from './TimeLine.svelte';
	import TopContent from './TopContent.svelte';
	const scoreData = data.find(
		(item) => item.pillar_subsubcategory_name === title || item.pillar_subcategory_name === title
	);
</script>

<section>
	<TopContent {title} {description} {year} {scoreData} {data} {tableContent} {pillarColor} />
	<TimeLine {pillarColor} />
</section>

<style>
	section {
		flex: 1 1 33%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-right: 2rem;
	}
</style>

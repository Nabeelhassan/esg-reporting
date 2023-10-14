<script lang="ts">
	export let colors;
	export let category;
	console.log(category);
	const ghgEmissions = ['GHG Scope 1', 'GHG Scope 2', 'GHG Scope 3'];
	const energyConsumption = [
		'Energy consumption renewable sources',
		'Energy consumption non-renewable sources'
	];
	colors = colors.filter((color) =>
		category === 'ghgEmissions'
			? ghgEmissions.includes(color.name)
			: energyConsumption.includes(color.name)
	);
</script>

<section>
	{#each colors as color}
		<div><span style="--color: {color.value}" /> {color.name}</div>
	{/each}
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		color: var(--text-color);
	}
	section > div {
		padding: 1rem 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	section > div > span {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border: solid 1px black;
		background-color: var(--color);
		margin-right: 0.25rem;
	}
</style>

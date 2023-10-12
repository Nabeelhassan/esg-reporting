<script lang="ts">
	export let colors;
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

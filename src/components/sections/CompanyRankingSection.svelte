<script lang="ts">
	export let data;
	export let year;
	import SpinPlotContainerAllCompanies from '../esgScoreSection/spinPlot/SpinPlotContainerAllCompanies.svelte';
	export let count;
	const valuesArray = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0];
	const newArray = valuesArray.map((value, index) => ({
		value0: value,
		value1: valuesArray[index + 1],
		companies: data.data.filter(
			(item) => item.score.ESG[year] <= value && item.score.ESG[year] >= valuesArray[index + 1]
		)
	}));
</script>

<section>
	<h1>Company ranking</h1>
	{#each newArray as value, index}
		<div>
			{#if index === 0 || index === newArray.length - 1}
				<p>{value.value0}</p>
			{/if}

			{#if value.companies.length}
				<p>{value.value0}</p>
				<div
					class="plot-container"
					style="display: grid; grid-template-columns: repeat({value.companies.length}, 1fr)"
				>
					{#each value.companies as company}
						<SpinPlotContainerAllCompanies companyData={company} {count} {year} />
					{/each}
				</div>
			{/if}
			{#if newArray[index - 1]}
				{#if newArray[index - 1].companies.length && !value.companies.length}
					<p>{value.value0}</p>
				{/if}
			{/if}
		</div>
	{/each}
</section>

<style>
	section {
		min-height: calc(100vh - 4rem);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		flex-direction: column;
		padding: 5rem;
	}
	section > div::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 0);
		width: 2px;
		height: 100%;
		background-color: var(--bg-color-light);
	}
	section :last-of-type > div::after {
		display: none;
	}
	section > div {
		display: flex;
		align-items: center;
		flex-direction: column;
		min-height: 5rem;
		position: relative;
		background-color: var(--theme-color);
		z-index: 1;
	}

	section > div > p {
		margin: 0;
		position: relative;
		z-index: 1;
		background-color: var(--theme-color);
		padding: 1rem;
	}
	.plot-container {
		justify-items: center;
		background-color: var(--theme-color);
		z-index: 1;
		position: relative;
		margin: 2rem 0;
	}
	section > div:hover :global(svg > g > defs > mask > path.barchart) {
		transform: scaleX(1);
		opacity: 1;
	}
	section > div:hover :global(.barchart-lines) {
		opacity: 1;
	}
	section > div:hover :global(.spinner) {
		opacity: 0.5;
	}
</style>

<script>
	export let tableContent;
	export let pillarColor;
	import roundToDecimal from '../../../helpers/roundToDecimal';
	const roundedTableContent = tableContent.map((item) => ({
		...item,
		values: {
			...item.values,
			2026: {
				...item.values[2026],
				value:
					item.unit === 'decimal'
						? roundToDecimal(item.values[2026].value, 1)
						: roundToDecimal(item.values[2026].value, 10)
			}
		}
	}));
</script>

<section>
	<div
		style="--grid-columns: {roundedTableContent.length > 3 ? 2 : roundedTableContent.length};
			 --grid-rows: {roundedTableContent.length > 3 ? 2 : 1}"
	>
		{#if roundedTableContent}
			{#each roundedTableContent as tableItem}
				<div class="table-header" style="--color: {pillarColor}">
					{tableItem.name}
				</div>
			{/each}
			{#each roundedTableContent as tableItem}
				<div style="--color: {pillarColor}">
					{tableItem.values[2026].value}<span
						>{tableItem.unit !== 'decimal' ? tableItem.unit : ''}</span
					>
				</div>
			{/each}
		{/if}
	</div>
</section>

<style>
	section {
		color: var(--text-color);
	}
	section > div {
		display: grid;
		grid-template-columns: repeat(var(--grid-columns), 1fr);
		grid-template-rows: repeat(var(--grid-rows), 1fr);
	}
	section > div > div {
		grid-auto-rows: 1;
	}

	section > div > div {
		border-bottom: solid 1px var(--color);
		border-right: solid 1px var(--color);
		padding: 0.5rem;
	}
	section > div:first-of-type > div {
		border-left: solid 1px var(--color);
	}
	/* section > div > div > div:last-of-type {
		border: 1px solid white;
		padding: 0.5rem;
	} */
	.table-header {
		border-bottom: 1px solid var(--color);
		border-top: 1px solid var(--color);
		color: var(--color);
		font-weight: 500;
		text-wrap: balance;
	}

	section > div > div > div > span {
		font-size: 0.65rem;
	}
</style>

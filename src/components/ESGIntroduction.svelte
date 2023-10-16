<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const introData = [
		`
			<h1>
				From 2025 and onwards the European Union forces companies that meet two of the three following
				conditions to report on sustainability topics.
			</h1>
		`,
		`
		<h1>These three conditions are:</h1>
		<ul>
			<li>Balance sheet of €20+ million</li>
			<li>Turnover of €40+ million</li>
			<li>250+ average employees over the reporting year</li>
		</ul>
		`,
		`
		<h1>The sustainability topics are divided into three pillars</h1>
	<div class="three-columns">
		<h2>Environment</h2>
		<h2>Social</h2>
		<h2>Governance</h2>
	</div>
		`,
		`
		<h1>Within these pillars are numerous categories, namely:</h1>
	<div class="three-columns">
		<div>
			<h2>Environment</h2>
			<ul>
				<li>Climate Change (i.e. emissions, energy consumption)</li>
				<li>Pollution (i.e. air pollution, water pollution)</li>
				<li>Water and marine sources (i.e. water consumption, water restoration)</li>
				<li>Biodiversity and ecosystems (i.e. land use, impacted species)</li>
				<li>Resource use and circular economy (i.e. material use, waste generated)</li>
			</ul>
		</div>
		<div>
			<h2>Social</h2>
			<ul>
				<li>Own workforce (i.e. gender diversity, health and safety)</li>
				<li>Workers in the value chain (i.e. negative impacts)</li>
				<li>Affected communities (i.e. negative impacts)</li>
				<li>Consumers and end-users (i.e. negative impacts)</li>
			</ul>
		</div>
		<div>
			<h2>Governance</h2>
			<ul>
				<li>businessConduct (i.e. corruption or bribery, payment practices)</li>
			</ul>
		</div>
	</div>
		`,
		`
			<h1>Let's dive into the report...</h1>
		`
	];
	$: count = 0;

	onMount(() => {
		console.log(window.scrollY);
		if (window.scrollY === 0) {
			document.body.style.overflow = 'hidden';
		}
	});
</script>

<section class={count === introData.length ? 'hide' : ''}>
	{#each introData as content, index}
		{#if count === index}
			<article
				in:fade={{
					duration: 250,
					delay: 500
				}}
				out:fade={{
					duration: 250
				}}
			>
				{@html content}
			</article>
		{/if}
	{/each}
	<div>
		{#if count < introData.length - 1}
			<button
				type="button"
				on:click={() => {
					count++;
					if (count === introData.length - 1) {
						document.body.style.overflow = '';
					}
				}}
			>
				Next
			</button>
		{:else}
			<button
				on:click={() => {
					const land = document.getElementById('land')?.getBoundingClientRect();
					window.scrollTo(0, land.y - 64);
					setTimeout(() => (count = 0), 1000);
				}}>Read report</button
			>
		{/if}
	</div>
</section>

<style>
	.show {
		display: block;
	}
	.hide {
		display: none;
	}
	section {
		padding: 5rem;
		min-height: calc(100vh - 4rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	section > article {
		flex: 1 1 100%;
	}
	article :global(h1),
	article :global(h2),
	article :global(h3) {
		letter-spacing: normal;
		line-height: 1.1;
		margin: 1rem;
	}
	article :global(h1) {
		font-size: 4rem;
	}
	article :global(h2) {
		font-size: 3rem;
	}
	article :global(.three-columns) {
		display: flex;
		justify-content: space-between;
	}

	article :global(.three-columns > div),
	article :global(.three-columns > h2) {
		flex: 1 1 100%;
	}

	button {
		font-size: 1rem;
		border: none;
		background-color: transparent;
	}
	article :global(ul > li) {
		font-size: 1rem;
	}
</style>

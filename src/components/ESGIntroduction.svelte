<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const introData = [
		/* html */ `
	<h1>
		From 2025 and onwards the European Union forces companies that meet two of the three following
		conditions to report on sustainability topics.
	</h1>
	`,
		/* html */ `
	<h1>These three conditions are:</h1>
	<div>
		<h2>Balance sheet of €20+ million</h2>
		<h2>Turnover of €40+ million</h2>
		<h2>250+ average employees over the reporting year</h2>
	</div>
	`,
		/* html */
		`
	<h1>The sustainability topics are divided into three pillars</h1>
	<div class="three-columns">
		<h2>Environment</h2>
		<h2>Social</h2>
		<h2>Governance</h2>
	</div>
	`,
		/* html */ `
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
				<li>Business conduct (i.e. corruption or bribery, payment practices)</li>
			</ul>
		</div>
	</div>
	`,
		/* html */ `
	<h1>Every company's impact can be calculated into a score called an ESG score</h1>
	`,
		/* html */ `
			<h1>If all companies' score well on ESG topics, the balance of the world will be kept in check</h1>
		`,
		/* html */ `
		<div class="two-columns">
			<div>
				<h1>Which is why the spinning top was brought to life</h1>
			</div>
			<div class="img-container">
				<img src="/images/spinplot-without-bars.svg" alt="">
			</div>
		</div>
	`,
		/* html */ `
	<div class="two-columns">
			<div>
				<h2>The spinning top will be straight when a company performs well on ESG topics and will be tilted if the company doesn't</h2>
			</div>
			<div class="img-container">
				<img src="/images/spinplot-without-bars.svg" alt="">
			</div>
		</div>
	`,
		/* html */ `
	<div class="two-columns">
			<div>
				<h2>The tilting will result in the spinner falling off the balancing bord</h2>
			</div>
			<div class="img-container">
				<img src="/images/spinplot-without-bars.svg" alt="">
			</div>
		</div>
	`,
		/* html */ `
		<div class="two-columns">
			<div>
				<h2>The topspin is calculated by bar charts. These bar charts represent the values of the individual Environment, Social, and Governance scores</h2>
			</div>
			<div class="img-container">
				<img src="/images/spinplot-with-bars.svg" alt="">
			</div>
		</div>
	`,
		/* html */ `
		<h1>Let's dive into the report</h1>
	`
	];

	$: count = 0;
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
				}}
			>
				Next
			</button>
		{:else}
			<a href="/">Explore ESG data</a>
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
	article :global(div.two-columns) {
		display: flex;
	}
	article :global(div.two-columns > div) {
		flex: 1 1 100%;
	}
	article :global(div.two-columns > div.img-container > img) {
		width: 100%;
		height: 100%;
		max-height: 27rem;
		object-fit: contain;
	}
</style>

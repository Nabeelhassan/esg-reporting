<script>
	import PillarsVenDiagram from './PillarsVenDiagram.svelte';
</script>

<section>
	<div class="left-column">
		<h2><b>E</b>nvironment</h2>
		<p>
			The first pillar of <b>ESG</b> is <b>E</b>nvironment. This pillar is all about how a company
			is impacting the environment through, emissions, energy consumption, renewable energy and
			materials and more. The main categories of Environment are:
		</p>
		<ul>
			<li>Climate Change</li>
			<li>Pollution</li>
			<li>Water and marine sources</li>
			<li>Biodiversity and ecosystems</li>
			<li>Resource use and circular economy</li>
		</ul>
		<h2><b>S</b>ocial</h2>
		<p>
			The second pillar of <b>ESG</b> is <b>S</b>ocial. This pillar is about the workforce and their
			gender diversity, privacy policies, work incidents, how the company impacts communities in
			surrounding areas and more. The main categories of Social are:
		</p>

		<ul>
			<li>Own workforce</li>
			<li>Workers in the value chain</li>
			<li>Affected communities</li>
			<li>Consumers and end-users</li>
		</ul>
		<h2><b>G</b>overnance</h2>
		<p>
			The third and final pillar of <b>ESG</b> is <b>G</b>overnance. This pillar is about board
			diversity, meeting attendance, corruption or bribery incidents, political influence and
			lobbying activities, payment practices. For Governance there is only one main category which
			is:
		</p>
		<ul><li>Business conduct</li></ul>
		<p>
			By assessing ESG factors in these three pillars and their respective categories and
			subcategories, businesses, investors, and regulators gain a comprehensive understanding of a
			company's sustainability, ethical practices, and overall impact on the environment, society,
			and governance. This information informs investment decisions, shapes corporate strategies,
			and promotes responsible business practices in an increasingly interconnected and socially
			conscious world.
		</p>
	</div>
	<div class="right-column">
		<h1>The Pillars</h1>
		<PillarsVenDiagram />
	</div>
</section>

<style>
	h1 {
		font-size: clamp(5rem, 7.5vw, 6rem);
		color: var(--theme-color);
		margin: 0 0 1rem;
	}
	section {
		padding: 2rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		background-color: var(--bg-color-light);
		gap: 4rem;
	}
	section > .left-column * {
		color: var(--theme-color);
	}
	section h2 {
		margin-bottom: 1rem;
	}
	section h2:first-of-type {
		margin-top: 0;
	}
</style>

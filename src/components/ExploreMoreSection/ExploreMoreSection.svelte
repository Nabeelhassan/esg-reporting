<script>
	import NavPillarLinks from '../Nav/NavPillarLinks.svelte';
	export let page;
</script>

<section>
	<h1>Explore more of Nike's Environment, Social and Governance values.</h1>
	<div class="links">
		<div>
			<h2>Environment</h2>
			<p>Find out about Nike's:</p>
			<ul>
				<li>C02 Emissions</li>
				<li>Energy Consumption</li>
				<li>Waste and recycling</li>
			</ul>
			<div class="link-container">
				<a
					class="{'/environment' === $page.url.pathname ? 'active' : ''} pillar"
					style="--pillar-color: #BCDA7E"
					href="/environment"><p>Learn more</p></a
				>
			</div>
		</div>
		<div>
			<h2>Social</h2>
			<p>Find out about Nike's:</p>
			<ul>
				<li>Employee gender diversity</li>
				<li>Employee health and safety</li>
				<li>Employee Top management</li>
			</ul>
			<div class="link-container">
				<a
					class="{'/social' === $page.url.pathname ? 'active' : ''} pillar"
					style="--pillar-color: #6257E2"
					href="/social"><p>Learn more</p></a
				>
			</div>
		</div>
		<div>
			<h2>Governance</h2>
			<p>Find out about Nike's:</p>
			<ul>
				<li>Corruption and bribery</li>
				<li>Lobbying tactics</li>
				<li>Privacy policy</li>
			</ul>
			<div class="link-container">
				<a
					class="{'/governance' === $page.url.pathname ? 'active' : ''} pillar"
					style="--pillar-color: #2AC28B"
					href="/governance"><p>Learn more</p></a
				>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		min-height: calc(100vh - 4rem);
		padding: 5rem;
	}
	h2 {
		margin: 0;
	}
	.links {
		display: flex;
		justify-content: space-around;
	}
	.links a {
		display: flex;
		align-items: center;
		color: #fff;
	}
	.links p {
		margin: 0;
		color: #fff;
	}
	.links a {
		font-size: 1em;
		text-decoration: none;
		position: relative;

		&:hover {
			&::after {
				transform: scaleX(1);
			}
		}
	}
	.link-container {
		display: flex;
		margin-top: 1rem;
	}
	.links a.active::after {
		transform: scaleX(1);
	}
	.links a::after {
		position: absolute;
		content: '';
		bottom: -5px;
		width: 100%;
		height: 0.15rem;
		background-color: var(--pillar-color);
		border-radius: 10px;
		transform: scaleX(0);
		transform-origin: left;
		transition: all 0.5s ease;
	}
	ul {
		margin: 0;
		/* padding-left: 0; */
	}
</style>

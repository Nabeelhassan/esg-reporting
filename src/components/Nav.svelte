<script lang="ts">
	import NikeLogoSVG from './NikeLogoSVG.svelte';
	import { page } from '$app/stores';
	let path;

	$: path = $page.url.pathname;
</script>

<nav>
	<div>
		<a class={'/' === $page.url.pathname ? 'active' : ''} style="--pillar-color: #fff" href="/">
			<NikeLogoSVG />
			<p>ESG REPORT</p>
		</a>
	</div>
	<div>
		<a
			class="{'/environment' === $page.url.pathname ? 'active' : ''} pillar"
			style="--pillar-color: #BCDA7E"
			href="/environment"><p>Environment</p></a
		>
		<a
			class="{'/social' === $page.url.pathname ? 'active' : ''} pillar"
			style="--pillar-color: #6257E2"
			href="/social"><p>Social</p></a
		>
		<a
			class="{'/governance' === $page.url.pathname ? 'active' : ''} pillar"
			style="--pillar-color: #2AC28B"
			href="/governance"><p>Governance</p></a
		>
	</div>
	<div>
		<a
			class={'/our-story' === $page.url.pathname ? 'active' : ''}
			style="--pillar-color: #fff"
			href="/our-story">Our story</a
		>
		<a
			class={'/about-esg' === $page.url.pathname ? 'active' : ''}
			style="--pillar-color: #fff"
			href="/about-esg"
		>
			About ESG
		</a>
	</div>
</nav>

<style>
	nav {
		display: flex;
		position: fixed;
		top: 0;
		width: 100%;
		justify-content: space-between;
		background-color: var(--theme-color);
		border-bottom: solid 1px var(--blue-color);
		z-index: 1;
	}
	nav > div {
		padding: 1rem;
		display: flex;
		align-items: center;
	}
	nav > div > a {
		display: flex;
		align-items: center;
		margin: 0 0.5rem;
		color: #fff;
	}
	p {
		margin: 0;
		color: #fff;
	}
	a {
		font-size: 1em;
		text-decoration: none;
		position: relative;

		&:hover {
			&::after {
				transform: scaleX(1);
			}
		}
	}
	a.active::after {
		transform: scaleX(1);
	}
	a::after {
		position: absolute;
		content: '';
		bottom: -5px;
		width: 100%;
		height: 0.15rem;
		background-color: var(--pillar-color);
		border-radius: 10px;
		transform: scaleX(0);
		transform-origin: center;
		transition: all 0.5s ease;
	}
</style>

<script>
	export let page;
</script>

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

<style>
	a {
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

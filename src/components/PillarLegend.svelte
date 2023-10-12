<section>
	<p style="--pillar-color: #BCDA7E">Environment</p>
	<p style="--pillar-color: #6257E2">Social</p>
	<p style="--pillar-color: #2AC28B">Governance</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		margin: auto;
	}
	p {
		display: flex;
		justify-content: center;
		position: relative;
		flex: 1;
		margin: 1rem 0;
	}
	p::before {
		position: absolute;
		content: '';
		height: 0.2rem;
		width: 100%;
		bottom: -5px;
		background-color: var(--pillar-color);
		left: -50%;
		transform: translateX(50%);
		border-radius: 10px;
	}
</style>

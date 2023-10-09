<script lang="ts">
	import LegendArrows from './esgScoreSection/scoreContent/LegendArrows.svelte';
</script>

<section>
	<div class="bar-container">
		<span class="target-value"><span class="bar-value" /></span>
		<p class="company-score">
			Company score <span><LegendArrows /></span> <span>0</span>
		</p>
		<p class="company-target">Company target <span><LegendArrows /></span> <span>0</span></p>
	</div>
</section>

<style>
	section {
		flex: 1;
		height: 100%;
	}
	.bar-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bar-container > span {
		position: relative;
		display: flex;
		height: 2rem;
		padding: 0 1.5rem;
		justify-content: center;
	}

	.bar-container > span > span {
		display: inline-block;
		height: 100%;
	}
	.bar-value {
		width: 100%;
		background-color: var(--color-social);
		border-radius: 50px;
		transform: rotate(-10deg);
	}
	.target-value {
		height: 2rem;
		width: 10rem;
		background-color: var(--color-social-opacity);
		border-radius: 50px;
	}
	p {
		margin-top: 1rem;
		position: relative;
		text-align: center;
	}
	p > span {
		display: block;
		width: 100%;
	}
	.company-score {
		width: calc(10rem - 3rem);
		position: relative;
	}
	.company-score span::before {
		content: '';
		position: absolute;
		width: 1px;
		background-color: white;
		height: 100px;
		bottom: 2.2rem;
		left: 0;
	}
	.company-target {
		position: relative;
		width: 10rem;
	}
	.company-target span::before {
		content: '';
		position: absolute;
		width: 1px;
		background-color: white;
		height: 225px;
		bottom: 2.2rem;
		left: 2px;
	}
</style>

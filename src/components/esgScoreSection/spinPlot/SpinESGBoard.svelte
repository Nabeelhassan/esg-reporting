<script lang="ts">
	export let data;
	export let year;
</script>

<section style=" --rotation: {0}deg; --translateY: 0px;)">
	<div class="bar-container">
		<div class="bar-value" style="--esg-score: {data.score.ESG[year] * 100}%;" />
	</div>
	<p><i>ESG score</i></p>
</section>

<style>
	section {
		padding: 0 25%;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		position: relative;
		bottom: 10px;
		transform-origin: center;
		left: 50%;
		transform: translateX(-50%);
	}
	section .bar-container {
		width: 100%;
		height: 10px;
		display: flex;
		background-color: white;
		border-radius: 10px;
		transform-origin: center;
		justify-content: flex-start;
	}
	section .bar-value {
		width: var(--esg-score);
		height: 10px;
		background-color: var(--blue-color);
		border-radius: 10px;
	}
	section p {
		transform: translateY(8px);
		margin: 0;
		text-align: center;
		width: 100%;
		text-transform: uppercase;
	}
</style>

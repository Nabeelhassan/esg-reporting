<script lang="ts">
	export let data;
	export let maxWidth;
	export let year;
	const index = data.score.ESG[year] < 0.33 ? 0 : data.score.ESG[year] < 0.66 ? 1 : 2;

	const colors = ['#FF1717', '#FFB617', '#179EFF'];
</script>

<section style=" --max-width: {$maxWidth}px;">
	<div class="bar-container">
		<div
			class="bar-value"
			style="--esg-score: {data.score.ESG[year] * 100}%; background-color: {colors[index]};"
		/>
	</div>
	<p><i>ESG score</i></p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		position: relative;
		bottom: 10px;
		transform-origin: center;
		left: 50%;
		transform: translateX(-50%);
		max-width: var(--max-width);
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
		transform: scaleX(0);
		animation: 0.3s linear grow forwards;
		transform-origin: left;
	}
	section p {
		transform: translateY(8px);
		margin: 0;
		text-align: center;
		width: 100%;
		text-transform: uppercase;
	}
	@keyframes grow {
		100% {
			transform: scaleX(1);
		}
	}
</style>

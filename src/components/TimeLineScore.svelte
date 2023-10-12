<script>
	export let year;
	const yearDiff = 2030 - Number(year);
	const yearValue = ((5 - yearDiff) / 5) * 100;
</script>

<section>
	<div class="timeline-container">
		<div>
			<div class="diamond" style="--y-position: {yearValue}%" />
		</div>
	</div>
	<div>
		<div class="year-container" style="--y-position: {yearValue}%">
			<p>
				{year}
			</p>
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		height: 100%;
		flex: 1;
		z-index: 0;
	}

	section > div,
	.timeline-container > div {
		width: 1rem;
		position: relative;
		height: 100%;
	}

	.timeline-container::before,
	.timeline-container::after {
		position: absolute;
		content: '';
		width: 1rem;
		height: 1px;
		background-color: #fff;
		left: 0;
		transform: translate(-50%, 0);
	}

	.timeline-container::before {
		top: 0;
	}

	.timeline-container::after {
		bottom: 0;
	}

	section > div .diamond,
	.year-container {
		position: absolute;
		top: var(--y-position);
		left: 0;
	}

	.year-container > p {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin: 0;
	}

	.diamond {
		width: 0.75rem;
		height: 0.75rem;
		z-index: 1;
	}

	.diamond::before {
		top: -50%;
		right: 50%;
		position: absolute;
		content: '';
		width: 100%;
		height: 100%;
		background-color: var(--blue-color);
		transform: rotate(45deg);
	}
	.timeline-container > div {
		width: 1px;
		height: 100%;
		background-color: white;
	}
</style>

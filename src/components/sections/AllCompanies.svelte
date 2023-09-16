<script>
	import ManySpinnersSVG from '../ManySpinnersSVG.svelte';
</script>

<section>
	<div>hi</div>
	<div><ManySpinnersSVG /></div>
	<div>hi</div>
</section>

<style>
	section {
		display: flex;
		justify-content: space-between;
		padding: 5rem;
	}
	section > div:nth-of-type(odd) {
		flex: 0.5;
	}
	section > div:nth-of-type(even) {
		flex: 1;
	}
</style>

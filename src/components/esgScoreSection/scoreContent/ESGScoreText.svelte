<script lang="ts">
	export let companyData;
	export let year;
	import roundToDecimal from '../../../helpers/roundToDecimal';
</script>

<h1>{year}</h1>
<h2>ESG Score <b>{roundToDecimal(companyData.score.ESG[year], 100)}</b>/1</h2>

<style>
	h1 {
		font-size: 4rem;
		margin: 0 0 0.5rem;
		text-wrap: unset;
		line-height: 1;
		text-transform: uppercase;
	}
	h2 {
		margin: 0;
		line-height: 1;
		margin-bottom: 1rem;
		text-transform: uppercase;
		font-size: 2rem;
	}
</style>

<script lang="ts">
	export let companyData;
	export let year;
	import roundToDecimal from '../../../helpers/roundToDecimal';
</script>

<h1>{year} ESG Score <b>{roundToDecimal(companyData.score.ESG[year], 100)}</b>/1</h1>

<style>
	h1 {
		text-transform: uppercase;
		font-size: 2.5rem;
		margin: 0 0 1rem;
		text-wrap: unset;
		line-height: 1;
	}
</style>

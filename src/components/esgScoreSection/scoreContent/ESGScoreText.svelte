<script lang="ts">
	export let companyData;
	export let year;
</script>

<h1><b>{companyData.score.ESG[year]}</b>/1 ESG Score {year}</h1>

<style>
	h1 {
		text-transform: uppercase;
		font-size: 40px;
		margin: 0 0 1em;
	}
</style>

<script lang="ts">
	export let data;
	export let companyData;
	export let radialGradientString: string;
	console.log(radialGradientString);
</script>

<section class="land" style="background:{radialGradientString}">
	<div class="titles">
		<h1><b>{companyData.name}</b> ESG Report</h1>
		<h1><b>{companyData.esgScore}</b>/1 ESG Score 2025</h1>
	</div>
	<h2>{companyData.tag}</h2>
</section>

<style>
	.land {
		min-height: 95vh;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.titles {
		display: flex;

		& h1:first-child {
			margin-right: 5vw;
		}
	}
	h1 {
		text-transform: uppercase;
		font-size: 50px;
		margin: 0;
	}
	h2 {
		font-size: 110px;
		line-height: 1;
		width: 80%;
		margin: 0;
	}
</style>

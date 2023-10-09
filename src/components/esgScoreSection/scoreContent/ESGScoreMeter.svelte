<script lang="ts">
	export let data;
	export let year;
	export let companyData;
</script>

<section>
	<div class="letter-container">
		<div>E</div>
		<div>D</div>
		<div>C</div>
		<div>B</div>
		<div>A</div>
	</div>
	<div class="bar-top-container">
		<div class="bar-container">
			<div style="width: {companyData.score.ESG[year] * 100}%;" class="bar-value" />
			<div class="line-container">
				<div class="line" />
				<div class="line" />
				<div class="line" />
				<div class="line" />
				<div class="line" />
				<div class="line" />
			</div>
		</div>
	</div>
</section>

<style>
	section .letter-container {
		display: flex;
		font-family: 'FamiljenGrotesk';
		width: 100%;
		justify-content: center;
		flex: 1;
		margin-bottom: 0.5em;
	}
	section .letter-container div {
		text-align: center;
		flex: 1;
		color: white;
	}
	.bar-top-container {
		width: 100%;
		height: 10px;
	}
	.bar-container {
		width: 100%;
		height: 5px;
		background-color: white;
		position: relative;
		border-radius: 10px;
	}
	.bar-value {
		height: 5px;
		background-color: var(--blue-color);
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 10px;
	}
	.line-container {
		display: flex;
		width: 100%;
	}

	.line {
		height: 10px;
		border-right: solid 1px white;

		position: absolute;
		transform: translateY(-25%);
	}
	.line:nth-of-type(1) {
		border: none;
	}
	.line:nth-of-type(2) {
		left: 20%;
	}
	.line:nth-of-type(3) {
		left: 40%;
	}
	.line:nth-of-type(4) {
		left: 60%;
	}
	.line:nth-of-type(5) {
		left: 80%;
	}
	.line:nth-of-type(6) {
		border: none;
	}
</style>

<script>
</script>

<section>
	<div class="column-left">
		<h2>Subcategory Score Formula:</h2>
		<div class="score-formula">
			<p>Company value - (worst value in dataset or possible)</p>
			<span />
			<p>Best value possible or in dataset - (worst value in dataset or possible)</p>
		</div>
		<p>
			For some values there is a best and worst value possible in general. For example 0 emissions
			is the best possible value for a company and 100% renewable energy is the best as well. It is
			the same for 0% renewable energy being the worst. But for the maximum amount of emissions,
			there is no cap. This cap is determined by the industry highest value.
		</p>
		<h2>Example Calculation:</h2>
		<p>
			For instance, if a company's renewable energy percentage in 2025 is 52% (with the worst in the
			dataset being 0% and the best being 100%), and the company's goal for 2030 is 80%, the company
			would receive a subcategory score of 52% in 2025 and 80% in 2030.
		</p>
		<h2>Calculating Category and ESG-Pillar Scores:</h2>
		<p>
			To calculate the category score, the average is calculated from the subcategories. This is
			also done for the ESG pillars and the eventual ESG score.
		</p>
		<p>
			This scoring method offers transparency in how scores are calculated and allows for tracking a
			company's progress over time. The simplicity of averaging ESG-pillar scores provides a clear
			and intuitive measure of a company's overall ESG performance without the complexities of
			relative weightings.
		</p>
	</div>
	<div class="column-right">
		<h1>Score Calculation method</h1>
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 4rem;
		padding: 2rem;
		background-color: var(--bg-color-light);
	}
	h1 {
		font-size: clamp(5rem, 7.5vw, 6rem);
		margin: 0;
		line-height: 0.8;
		color: var(--theme-color);
	}
	h2 {
		line-height: 0.8;
		text-wrap: unset;
		margin-bottom: 1rem;
	}
	.column-left > h2:first-of-type {
		margin-top: 0;
	}
	.column-left > * {
		color: var(--theme-color);
	}
	.score-formula p {
		margin: 0;
		color: var(--theme-color);
		text-align: center;
	}
	.score-formula p:first-of-type {
		margin-top: 1rem;
	}
	.score-formula {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.score-formula > span {
		display: inline-block;
		width: 100%;
		height: 1px;
		background-color: var(--theme-color);
	}
</style>

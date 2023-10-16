<script>
	import EsgCategorySection from '../../components/esgCategorySection/ESGCategorySection.svelte';
	export let data;
	const pillar = 'environment';
	const nike = data.data.find((company) => company.name === 'Nike');
	const pillarColor = data.pillarColors.find((item) => item.pillar === pillar).color;
	const tableContentGHG = nike.values.filter(
		(item) =>
			item.name === 'Total GHG Scope 1' ||
			item.name === 'Total GHG Scope 2' ||
			item.name === 'Total GHG Scope 3'
	);
	const tableContentWaste = nike.values.filter((item) => item.pillar_subcategory === 'waste');
	const tableContentWater = nike.values.filter(
		(item) =>
			item.name === 'Water restored' ||
			item.name === 'Total water consumption' ||
			item.name === 'Water recycled and reused'
	);
	const tableContentEnergyConsumption = nike.values.filter(
		(item) =>
			item.name === 'Energy consumption total' ||
			item.name === 'Share of renewable energy from total'
	);
</script>

<EsgCategorySection
	data={nike}
	category={'ghgEmissions'}
	chartString={'GHGEmissionsChart'}
	description={`These values represent Nike's GHG emissions divided by Scopes 1, 2 and 3 expressed in C02. GHG Scope 1 are all of the emissions from own operations. GHG Scope 2 are all of the emissions from energy consumption. GHG Scope 3 are emissions from external factors.`}
	{pillarColor}
	tableContent={tableContentGHG}
/>

<EsgCategorySection
	data={nike}
	category={'waste'}
	chartString={'CircleWaste'}
	description={`These values represent Nike's waste generation and recycling, expressed in metric tonnes.`}
	{pillarColor}
	tableContent={tableContentWaste}
/>

<EsgCategorySection
	data={nike}
	category={'energyConsumption'}
	chartString={'Treemap'}
	description={`These values represent Nike's Energy Consumption expressed in megawatt per hour (Mwh).`}
	{pillarColor}
	tableContent={tableContentEnergyConsumption}
/>

<EsgCategorySection
	data={nike}
	category={'water'}
	chartString={'WaterBars'}
	description={`These values represent Nike's water restoration, water consumption, and water recycling efforts expressed in billion liters.`}
	{pillarColor}
	tableContent={tableContentWater}
/>

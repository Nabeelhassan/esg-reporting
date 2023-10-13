<script>
	import EsgCategorySection from '../../components/esgCategorySection/ESGCategorySection.svelte';
	export let data;
	const pillar = 'governance';
	const nike = data.data.find((company) => company.name === 'Nike');
	const pillarColor = data.pillarColors.find((color) => color.pillar === pillar)?.color;

	const tableContentCorruption = nike.values
		.filter(
			(item) =>
				item.name === 'Total number of confirmed incidents of corruption or bribery' ||
				item.name ===
					'Number of convictions for violation of anti- corruption and anti-bribery laws' ||
				item.name === 'Number of internal dismissals/discipline for corruption or bribery.'
		)
		.map((item) => ({
			...item,
			name:
				item.name === 'Total number of confirmed incidents of corruption or bribery'
					? 'Incidents Total'
					: item.name ===
					  'Number of convictions for violation of anti- corruption and anti-bribery laws'
					? 'Convictions for violation'
					: 'Dismissals/ discipline amount'
		}));

	const tableContentPaymentPractices = nike.values
		.filter(
			(item) =>
				item.name === 'Percentage of payments aligned with the standard payment terms' ||
				item.name === 'Average time the undertaking takes to pay an invoice'
		)
		.map((item) => ({
			...item,
			name:
				item.name === 'Percentage of payments aligned with the standard payment terms'
					? '% payments aligned with standard payment terms'
					: 'Average time to pay invoice'
		}));
</script>

<EsgCategorySection
	data={nike}
	category={'corruptionOrBribery'}
	chartString={'CorruptionBribery'}
	description={`These values represent Nike's Corruption or Bribery values.`}
	{pillarColor}
	tableContent={tableContentCorruption}
/>
<EsgCategorySection
	data={nike}
	category={'paymentPractices'}
	chartString={'PaymentPractices'}
	description={`These values represent Nike's Payment Practices.`}
	{pillarColor}
	tableContent={tableContentPaymentPractices}
/>

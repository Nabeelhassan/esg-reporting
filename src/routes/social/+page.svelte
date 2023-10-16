<script>
	import EsgCategorySection from '../../components/esgCategorySection/ESGCategorySection.svelte';

	export let data;
	const nike = data.data.find((company) => company.name === 'Nike');
	const pillarColor = '#8B84DB';

	const tableContentManagement = nike.values.filter(
		(item) =>
			item.name === 'Total number of top management' ||
			item.name === 'Percentage of female top management' ||
			item.name === 'Percentage of male top management'
	);

	const tableContentFulltimeParttime = nike.values.filter(
		(item) =>
			item.name === 'Percentage difference of male female full-time employees' ||
			item.name === 'Percentage difference of male female part-time employees'
	);
	const tableContentMaleFemaleTotal = nike.values.filter(
		(item) =>
			item.name === 'Total number of employees' ||
			item.name === 'Percentage of male employees' ||
			item.name === 'Percentage of female employees'
	);
	const tableContentHealth = nike.values.filter(
		(item) => item.pillar_subcategory === 'healthAndSafety'
	);
	console.log(tableContentHealth);
</script>

<EsgCategorySection
	data={nike}
	category={'employees'}
	chartString={'MaleFemaleTotal'}
	description={`These values represent Nike's employee gender distribution.`}
	{pillarColor}
	tableContent={tableContentMaleFemaleTotal}
/>
<EsgCategorySection
	data={nike}
	category={'employmentStatus'}
	chartString={'FulltimeParttime'}
	description={`These values represent Nike's Fulltime and Parttime employee gender distribution.`}
	{pillarColor}
	tableContent={tableContentFulltimeParttime}
/>

<EsgCategorySection
	data={nike}
	category={'topManagement'}
	chartString={'TopManagement'}
	description={`These values represent Nike's Top management gender distribution.`}
	{pillarColor}
	tableContent={tableContentManagement}
/>

<EsgCategorySection
	data={nike}
	category={'healthAndSafety'}
	chartString={'HealthSafety'}
	description={`These values represent Nike's Health and Safety incident rate and lost time rate.`}
	{pillarColor}
	tableContent={tableContentHealth}
/>

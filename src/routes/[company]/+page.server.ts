import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const data = await parent();

	const filteredData = data.data.find((item) => item.name.toLowerCase() === params.company);
	return { data: filteredData };
}) satisfies PageServerLoad;

import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	try {
		const res = await fetch('/new-dummy.json');
		const data = res.json();

		return {
			data: data,
			pillarColors: [
				{
					pillar: 'environment',
					color: '#BCDA7F'
				},
				{
					pillar: 'social',
					color: '#645AE1'
				},
				{
					pillar: 'governance',
					color: '#37C58E'
				}
			]
		};
	} catch (error: any) {
		throw new Error(error);
	}
}) satisfies LayoutServerLoad;

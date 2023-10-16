import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, cookies, url }) => {
	const intro = cookies.get('intro');
	if (!intro) throw redirect(307, '/intro');
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
			],
			url: url.pathname
		};
	} catch (error: any) {
		throw new Error(error);
	}
}) satisfies LayoutServerLoad;

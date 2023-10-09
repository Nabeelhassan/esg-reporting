import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	try {
		const res = await fetch('/new-dummy.json');
		const data = res.json();

		return { data: data };
	} catch (error: any) {
		throw new Error(error);
	}
}) satisfies LayoutServerLoad;

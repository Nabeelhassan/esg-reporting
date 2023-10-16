import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	try {
		cookies.set('intro', 'true');
		return;
	} catch (error: any) {
		throw new Error(error);
	}
}) satisfies PageServerLoad;

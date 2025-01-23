import { userStore } from '$lib/stores/userStore';

export async function load({params, locals}) {
    try {
        if (locals.user) {
            return { user: locals.user };
        }
        return { user: null };
    } catch (error) {
        console.error(error);
        return { user: null };
    }
}
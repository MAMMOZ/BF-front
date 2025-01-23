import { userStore } from '$lib/stores/userStore';

export async function load({params, locals}) {
    try {
        // Only set the store if locals.user exists and is not null
        if (locals.user) {
            userStore.set(locals.user);
            return {user: locals.user};
        }
        
        // If no user, return an empty object or null
        return {user: null};
        
    } catch (error) {
        console.error(error);
        return {user: null};
    }
}
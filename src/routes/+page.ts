import {error} from '@sveltejs/kit';
import type { HttpError } from '@sveltejs/kit';
import type { Hero } from '$lib/models.js';
import type { PageLoad } from './$types';

export const load: PageLoad<{ heroes: Hero[] } | HttpError> = async () => {
    try {        
	    const data = await fetch('https://api.opendota.com/api/heroes');
        const heroes: Hero[] = (await data.json() ?? []);       

        return {
            heroes
        } as { heroes: Hero[] };
        
    } catch (err) {
        return error(500, 'Unable to load heroes');
    }
}

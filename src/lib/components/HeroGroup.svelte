<script lang="ts">
	import type { Hero } from "$lib/models";
    import { Icon } from 'svelte-simple-feather';
    import {addExcludedHero} from "$lib/settings.store";

    export let heroes: Hero[] = [];

    const handleIconClick = (hero: string) => {
        console.log(hero);
        addExcludedHero(hero);
    }
</script>


<div class="hero-group">
    {#each heroes as hero}
        <div class="hero">
            <span>{hero.localized_name}</span>
            <button class="icon" on:click={() => handleIconClick(hero.localized_name)}>
                <Icon icon="eye-off" />
            </button>
        </div>
    {/each}
</div>

<style>
    .hero-group {
        display: flex;
        flex-direction: column;
        background-color: var(--bg-2);
        padding: 1rem;
        border-radius: .5rem;
        width: 150px;
    }

    .hero {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .hero > .icon {
        background-color: transparent;
        color: var(--fg-3);
        cursor: pointer;
        padding: .25rem;
    }

    .hero > .icon:hover {
        color: var(--fg-1);
    }
</style>
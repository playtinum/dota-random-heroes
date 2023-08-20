<script lang="ts">
	import HeroGroup from '$lib/components/HeroGroup.svelte';
import type { Hero } from '$lib/models';
	import { heroCount } from '$lib/settings.store';
    import type { PageData } from './$types';

    export let data: PageData;
    let currentHeroSelection: Hero[] = [];
    let heroesHistory: Hero[][] = [];

    const { heroes } = data;

	function randomNewHeroes(count: number) {
        if(!heroes || heroes.length < 1) return;

        
        if(currentHeroSelection.length > 0) {
        // add latest to history
        heroesHistory = [currentHeroSelection, ...heroesHistory.slice(0, 4)]
        }

        // get count distinct random numbers in the range of 0 to heroes.length
        const randomNumbers = [];
        while (randomNumbers.length < count) {
            const randomNumber = Math.floor(Math.random() * heroes.length);
            if (randomNumbers.indexOf(randomNumber) === -1) {
                randomNumbers.push(randomNumber);
            }
        }

        currentHeroSelection = randomNumbers.map((randomNumber) => heroes[randomNumber]);
    }
</script>

<h1>Dota 2 Random Hero Picker</h1>
<button type="button" on:click={() => randomNewHeroes($heroCount)}>Randomize {$heroCount}</button>

<div class="results-container">
    {#if currentHeroSelection.length > 0}
        <div class="current-selection-container">
            <h2>Current</h2>
            <HeroGroup heroes={currentHeroSelection} />
        </div>
    {/if}

    {#if heroesHistory.length > 0}
    <div>
    <h2>History</h2>
        <div class="history-container">
            {#each heroesHistory as heroSelection}
                <HeroGroup heroes={heroSelection} />
            {/each}
        </div>
    </div>
    {/if}
    
</div>

<style>
    .results-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .history-container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-top: 1rem;
    }

    .current-selection-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex-basis: 100%;
    }

    .history-container {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        flex-basis: 100%;
    }
</style>

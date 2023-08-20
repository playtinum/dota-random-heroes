<script lang="ts">
	import type { Hero } from "$lib/models";

    export let heroes: Hero[] = [];
</script>


<div class="hero-group">
    {#each heroes as hero}
        <div class="hero">{hero.localized_name}</div>
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
</style>
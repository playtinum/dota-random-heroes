<script lang="ts">
	import { excludedHeroes, heroCount, initSettingsStore, saveSettingsToLocalStorage } from "$lib/settings.store";
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

    let showNotification = false;

    $: settings = {
        $heroCount,
        $excludedHeroes
    };

    onMount(() => {
        initSettingsStore();
    });

    function saveSettings() {
        saveSettingsToLocalStorage({
            heroCount: $heroCount,
            excludedHeroes: $excludedHeroes ?? '',
        });

        showNotification = true;
        setTimeout(() => {
            showNotification = false;
        }, 2000);
    }
</script>

<div class="settings">
<div class="formfield">
<label for="heroCount">Count of randomized heroes</label>
<input id="heroCount" type="number" bind:value={$heroCount} />
</div>

<div class="formfield">
<label for="excludedHeroes">Excluded heroes (comma separated)</label>
<input id="excludedHeroes" type="text" bind:value={$excludedHeroes} />
</div> 

<button on:click={() => saveSettings()}>Save</button>

{#if showNotification}
    <div class="save-notification" out:fade in:fly={{ y: 20, duration: 500 }}>
        Settings saved! 
    </div>
{/if}

</div>

<style>
    .settings {
        display: flex;
        flex-direction: column;
        width: 450px;
    }

    .formfield {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    input {
        padding: 0.5rem;
        border: none;
        border-radius: 0.25rem;
        background-color: var(--bg-2);
        color: var(--text-1);
    }

    input:focus {
        outline: none;
    }

    .save-notification {
        margin-top: 1rem;
        text-align: center;
        font-weight: 500;
        background-color: #4caf50;
        color: var(--text-1);
        padding: 0.5rem;
        border-radius: 0.25rem;
    }
</style>
import { writable } from "svelte/store";

const defaultSettings = {
    heroCount: 3,
    excludedHeroes: [],
};

export const heroCount = writable<number>(defaultSettings.heroCount);
export const excludedHeroes = writable<string[]>(defaultSettings.excludedHeroes);

export function initSettingsStore() {
    // load settings from local storage
    const jsonSettings = localStorage.getItem("settings");
    if (!jsonSettings) return;

    const settings = JSON.parse(jsonSettings);

    // if settings exist, update the store
    if (settings) {
        const { heroCount, excludedHeroes } = settings;
        heroCount.set(heroCount);
        excludedHeroes.set(excludedHeroes);
    }
}

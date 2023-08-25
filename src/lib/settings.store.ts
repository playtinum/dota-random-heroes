import { writable } from "svelte/store";

const defaultSettings = {
    heroCount: 3,
    excludedHeroes: '',
};

export const heroCount = writable<number | null>(null);
export const excludedHeroes = writable<string>(defaultSettings.excludedHeroes);

export function initSettingsStore() {
    // load settings from local storage
    const jsonSettings = localStorage.getItem("settings");
    if (!jsonSettings) return;

    const settings = JSON.parse(jsonSettings);

    // if settings exist, update the store
    if (settings) {
        heroCount.set(settings.heroCount ?? defaultSettings.heroCount);
        excludedHeroes.set(settings.excludedHeroes ?? defaultSettings.excludedHeroes);
    }
}

export function saveSettingsToLocalStorage(settings: typeof defaultSettings) {
    if(settings) {
        localStorage.setItem("settings", JSON.stringify(settings));
    }
}

import { writable } from "svelte/store";

export type Settings = {
    heroCount: number | null;
    excludedHeroes: string;
}

export const settings = writable<Settings>({
    heroCount: null,
    excludedHeroes: '',
});

export function initSettingsStore() {
    // load settings from local storage
    const jsonSettings = localStorage.getItem("settings");
    if (!jsonSettings) return;

    const loadedSettings = JSON.parse(jsonSettings);

    // if settings exist, update the store
    if (loadedSettings) {
        settings.set(loadedSettings);
    }
}

export function addExcludedHero(hero: string): void {
    settings.update((settings) => {
        const { excludedHeroes } = settings;
        settings.excludedHeroes = [excludedHeroes, hero].join(',');
        saveSettingsToLocalStorage(settings);
        return settings;
    });
}

export function removeExcludedHero(hero: string): void {
    settings.update((settings) => {
        const { excludedHeroes } = settings;
        settings.excludedHeroes = excludedHeroes.split(',').filter((h) => h !== hero).join(',');
        saveSettingsToLocalStorage(settings);
        return settings;
    });
}


export function saveSettingsToLocalStorage(settings: Partial<Settings>) {
    if(settings) {
        localStorage.setItem("settings", JSON.stringify(settings));
    }
}

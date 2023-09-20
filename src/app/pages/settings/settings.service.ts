import { computed, effect, Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupControls } from '../../+utils/utils';

export type Settings = {
  randomizeCount: number;
  excludedHeroes: string; // comma separated list of hero names
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings = signal<Settings>({
    randomizeCount: 3,
    excludedHeroes: '',
  });
  randomizeCount = computed(() => this.settings().randomizeCount);
  excludedHeroes = computed(() =>
    this.settings()
      .excludedHeroes.split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
  );

  constructor() {
    this.loadSettingsFromLocalStorage();

    // save settings to local storage
    effect(() => {
      localStorage.setItem('settings', JSON.stringify(this.settings()));
    });
  }

  saveSettingsFromFormGroup(formGroup: FormGroup<FormGroupControls<Settings>>) {
    if (formGroup.valid) {
      const { randomizeCount, excludedHeroes } = formGroup.value;
      this.settings.set({
        randomizeCount: randomizeCount ?? 3,
        excludedHeroes: excludedHeroes ?? '',
      });
    }
  }

  private loadSettingsFromLocalStorage() {
    const settings = localStorage.getItem('settings');
    if (settings) {
      this.settings.set(JSON.parse(settings));
    }
  }
}

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroGroupComponent } from '../../components/hero-group.component';
import { SettingsService } from '../settings/settings.service';
import { RandomizeService } from './randomize.service';

@Component({
  selector: 'app-randomize',
  standalone: true,
  imports: [CommonModule, HeroGroupComponent],
  template: `
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Randomize Heroes</h2>
      <button class="w-fit" (click)="randomizeService.randomizeHeroesForCount(settingsService.randomizeCount())">
        Randomize {{ settingsService.randomizeCount() }}
      </button>
      <app-hero-group
        *ngIf="currentRandomHeroesAvailable()"
        [heroes]="randomizeService.currentRandomizedHeroes()"></app-hero-group>
      <h2 class="text-2xl" *ngIf="randomHistoryAvailable()">History</h2>
      <div class="flex flex-row gap-4">
        <app-hero-group *ngFor="let history of randomizeService.randomHistory()" [heroes]="history"></app-hero-group>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomizeComponent {
  randomizeService = inject(RandomizeService);
  settingsService = inject(SettingsService);

  randomHistoryAvailable = computed(() => this.randomizeService.randomHistory().length > 0);
  currentRandomHeroesAvailable = computed(() => this.randomizeService.currentRandomizedHeroes().length > 0);
}

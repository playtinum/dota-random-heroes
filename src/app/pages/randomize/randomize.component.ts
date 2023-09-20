import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesService } from '../../heroes.service';
import { Hero } from '../../models';
import { HeroGroupComponent } from '../../components/hero-group.component';
import { SettingsService } from '../settings/settings.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { pairwise, scan } from 'rxjs';

@Component({
  selector: 'app-randomize',
  standalone: true,
  imports: [CommonModule, HeroGroupComponent],
  template: `
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl">Randomize Heroes</h2>
      <button class="w-fit" (click)="randomizeHeroes()">Randomize {{ settingsService.randomizeCount() }}</button>
      <app-hero-group *ngIf="currentRandomHeroes().length > 0" [heroes]="currentRandomHeroes()"></app-hero-group>
      <h2 class="text-2xl" *ngIf="isHistoryAvailable()">History</h2>
      <div class="flex flex-row gap-4">
        <app-hero-group *ngFor="let history of randomHistory()" [heroes]="history"></app-hero-group>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomizeComponent {
  heroesService = inject(HeroesService);
  settingsService = inject(SettingsService);

  currentRandomHeroes = signal<Hero[]>([]);
  isHistoryAvailable = computed(() => {
    return this.randomHistory() !== undefined && this.randomHistory().length > 0;
  });
  private randomHistory$ = toObservable(this.currentRandomHeroes).pipe(
    pairwise(),
    scan((acc, [previous]) => (previous.length ? [previous, ...acc.slice(0, 4)] : []), [] as Hero[][])
  );
  randomHistory = toSignal(this.randomHistory$, { initialValue: [] as Hero[][] });

  randomizeHeroes() {
    const heroes =
      this.heroesService
        .heroes()
        ?.filter((hero) => !this.settingsService.excludedHeroes().includes(hero.localized_name)) ?? [];

    const randomHeroes: Hero[] = [];
    for (let i = 0; i < this.settingsService.randomizeCount(); i++) {
      const randomIndex = Math.floor(Math.random() * heroes.length);
      // pop random hero from heroes array to get distinct heroes
      const hero = heroes.splice(randomIndex, 1)[0];
      randomHeroes.push(hero);
    }
    this.currentRandomHeroes.set(randomHeroes);
  }
}

import { computed, inject, Injectable } from '@angular/core';
import { Hero } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable, of, share, Subject, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsService } from './pages/settings/settings.service';

type HeroStorage = {
  heroes: Hero[];
  lastUpdatedTimestamp: number;
};

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private http = inject(HttpClient);
  private settingsService = inject(SettingsService);
  heroesWithoutExcluded = computed(() => {
    const excludedHeroes = this.settingsService.excludedHeroes();
    return this.heroes().filter((hero) => !excludedHeroes.includes(hero.localized_name));
  });
  private initialHeroesSubject$ = new Subject<Hero[]>();
  private heroes$: Observable<Hero[]> = this.initialHeroesSubject$.pipe(
    switchMap((heroes) =>
      heroes.length <= 0
        ? this.http.get<Hero[]>('https://api.opendota.com/api/heroes').pipe(
            share(),
            tap((heroes) => {
              // cache heroes in local storage
              localStorage.setItem(
                'heroes',
                JSON.stringify({
                  heroes,
                  lastUpdatedTimestamp: Date.now(),
                } as HeroStorage)
              );
            })
          )
        : of(heroes)
    )
  );
  heroes = toSignal(this.heroes$, { initialValue: [] as Hero[] });

  constructor() {
    this.initHeroes();
  }

  private initHeroes() {
    const heroesFromStorage: string | null = localStorage.getItem('heroes');

    if (heroesFromStorage) {
      const heroStorage: HeroStorage = JSON.parse(heroesFromStorage);

      // when updated more than 1 day ago, update heroes
      const dayInMs = 1000 * 60 * 60 * 24;
      if (heroStorage.lastUpdatedTimestamp > Date.now() - dayInMs) {
        this.initialHeroesSubject$.next(heroStorage.heroes ?? []);
      } else {
        this.initialHeroesSubject$.next([]);
      }
    } else {
      this.initialHeroesSubject$.next([]);
    }
  }
}

import { inject, Injectable } from '@angular/core';
import { HeroesService } from '../../heroes.service';
import { map, pairwise, scan, share, Subject } from 'rxjs';
import { Hero } from '../../models';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class RandomizeService {
  private heroesService = inject(HeroesService);
  // takes the number of heroes to randomize
  private randomizeHeroesSubject$ = new Subject<number>();
  private randomizedHeroes$ = this.randomizeHeroesSubject$.pipe(
    map((count) => {
      const heroes = this.heroesService.heroesWithoutExcluded();
      const randomHeroes: Hero[] = [];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * heroes.length);
        // pop random hero from heroes array to get distinct heroes
        const hero = heroes.splice(randomIndex, 1)[0];

        randomHeroes.push(hero);
      }

      return randomHeroes;
    }),
    share()
  );
  /**
   * The current randomized heroes
   */
  currentRandomizedHeroes = toSignal(this.randomizedHeroes$, { initialValue: [] as Hero[] });
  private randomHistory$ = this.randomizedHeroes$.pipe(
    pairwise(),
    scan((acc, [previous]) => (previous.length ? [previous, ...acc.slice(0, 4)] : []), [] as Hero[][])
  );
  /**
   * The history of randomized heroes (last 5)
   */
  randomHistory = toSignal(this.randomHistory$, { initialValue: [] as Hero[][] });

  /**
   * Randomizes heroes for the given count outputting the result via signal {@link currentRandomizedHeroes}
   * @param count
   */
  randomizeHeroesForCount(count: number) {
    this.randomizeHeroesSubject$.next(count);
  }
}

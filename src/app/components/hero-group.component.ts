import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../models';

@Component({
  selector: 'app-hero-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="bg-gray-700 p-4 rounded w-52">
      <li *ngFor="let hero of heroes">{{ hero.localized_name }}</li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroGroupComponent {
  @Input({ required: true }) heroes: Hero[] = [];
}

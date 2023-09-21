import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MessagesComponent } from './components/notifications/messages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MessagesComponent],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="font-bold" [routerLinkActiveOptions]="{ exact: true }">Randomizer</a>
      <a routerLink="/settings" routerLinkActive="font-bold" [routerLinkActiveOptions]="{ exact: true }">Settings</a>
    </nav>
    <main>
      <router-outlet />
    </main>
    <footer>
      <small
        >&copy; <a href="https://github.com/playtinum">playtinum</a> {{ currentYear }} |
        <a href="/imprint">Impressum</a></small
      >
    </footer>
    <app-messages></app-messages>
  `,
  styles: [
    `
      .app {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: calc(100vh - 2rem);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}

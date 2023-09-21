import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageComponent],
  template: `<div class="fixed top-5 right-5">
    <app-message *ngFor="let message of messagesService.activeMessages()" [message]="message"></app-message>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  messagesService = inject(MessagesService);
}

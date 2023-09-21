import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService, MessageWithId } from './messages.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center justify-between p-4 rounded-lg shadow-lg mb-2 max-w-md text-white bg"
      [ngClass]="{
        'bg-emerald-500': message.severity === 'success',
        'bg-amber-500': message.severity === 'warning',
        'bg-rose-500': message.severity === 'error',
        'bg-blue-500': message.severity === 'info'
      }">
      <div class="flex flex-col gap-1">
        <div class="font-bold">{{ message.title }}</div>
        <div>{{ message.summary }}</div>
      </div>
      <div role="button" *ngIf="removable" (click)="remove()" class="ml-4 bg-none hover:bg-none">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-2.293 2.293 2.293 2.293a1 1 0 01-1.414 1.414L10 14.414l-2.293 2.293a1 1 0 01-1.414-1.414l2.293-2.293L6.293 10.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input({ required: true }) message!: MessageWithId;
  @Input() removable = true;
  private messagesService = inject(MessagesService);

  remove() {
    this.messagesService.removeMessage(this.message);
  }
}

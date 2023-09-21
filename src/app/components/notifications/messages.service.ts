import { Injectable } from '@angular/core';
import { delay, map, merge, mergeMap, Observable, of, scan, share, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { v4 as uuid } from 'uuid';

export const Severity = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
} as const;

export type SeverityType = keyof typeof Severity;

export type Message = {
  title: string;
  summary: string;
  severity: SeverityType;
  timeToLive?: number;
};

export type MessageWithId = Message & { id: string };

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private newMessageSubject$ = new Subject<Message>();
  private newMessageWithId$ = this.newMessageSubject$.pipe(
    map((message) => ({ ...message, id: uuid() })),
    share()
  );
  private removeMessageSubject$ = new Subject<MessageWithId>();
  private timeToLiveMessageDelayedId$: Observable<string> = this.newMessageWithId$.pipe(
    mergeMap((message) =>
      of(message).pipe(
        delay(message.timeToLive ?? 5000),
        map((message) => message.id)
      )
    )
  );
  private activeMessages$: Observable<MessageWithId[]> = merge(
    this.newMessageWithId$,
    this.removeMessageSubject$.pipe(map((message) => message.id)),
    this.timeToLiveMessageDelayedId$
  ).pipe(
    scan((acc, messageOrId: MessageWithId | string) => {
      // remove incoming messages with id and add new message with id
      return typeof messageOrId === 'string' ? acc.filter(({ id }) => id !== messageOrId) : [...acc, messageOrId];
    }, [] as MessageWithId[])
  );
  activeMessages = toSignal(this.activeMessages$, { initialValue: [] as MessageWithId[] });

  addMessage(message: Message) {
    this.newMessageSubject$.next(message);
  }

  removeMessage(message: MessageWithId) {
    this.removeMessageSubject$.next(message);
  }
}

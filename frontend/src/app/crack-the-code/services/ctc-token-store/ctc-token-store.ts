import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CtcNotification} from "../ctc-notification/ctc-notification";

@Injectable({
  providedIn: 'root',
})
export class CtcTokenStore {
  private readonly notification = inject(CtcNotification)
  private readonly token$ = new BehaviorSubject<string | null>(null)

  set(token: string | null) {
    this.token$.next(token)
    this.notification.connect(token ?? undefined)
  }

  get snapshot(): string | null {
    return this.token$.value
  }

  clear() {
    this.token$.next(null)
    this.notification.disconnect()
  }
}

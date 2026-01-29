import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CtcTokenStore {
  private readonly token$ = new BehaviorSubject<string | null>(null)

  set(token: string | null) {
    this.token$.next(token)
  }

  get snapshot(): string | null {
    return this.token$.value
  }

  clear() {
    this.token$.next(null)
  }
}

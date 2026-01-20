import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable, of, shareReplay, tap} from "rxjs";
import {SessionStatus, UserDetail} from "../../models";
import {CtcUserAuth} from "../ctc-user-auth/ctc-user-auth";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CtcSession {
  private readonly user$ = new BehaviorSubject<UserDetail | null>(null)
  private readonly status$ = new BehaviorSubject<SessionStatus>('unknown')

  private inflightMe$: Observable<UserDetail | null> | null = null

  constructor (private readonly auth: CtcUserAuth) {}

  getUser$ (): Observable<UserDetail | null> {
    return this.user$.asObservable()
  }

  getStatus$ (): Observable<SessionStatus> {
    return this.status$.asObservable()
  }

  get snapshot () {
    return { user: this.user$.value, status: this.status$.value }
  }

  loadMe (): Observable<UserDetail | null> {
    if (this.inflightMe$) return this.inflightMe$

    this.inflightMe$ = this.auth.me().pipe(
      tap((user) => {
        this.user$.next(user)
        this.status$.next('authenticated')
      }),
      map((user) => user),
      catchError(() => {
        this.user$.next(null)
        this.status$.next('unauthenticated')
        return of(null)
      }),
      finalize(() => {
        this.inflightMe$ = null
      }),
      shareReplay(1)
    )

    return this.inflightMe$
  }

  clear () {
    this.user$.next(null)
    this.status$.next('unauthenticated')
  }
}

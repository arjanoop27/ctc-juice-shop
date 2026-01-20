import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import {CtcSession} from "../services/ctc-session/ctc-session";

@Injectable({ providedIn: 'root' })
export class CtcGuestGuard implements CanActivate {
  constructor(private readonly session: CtcSession, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    const snap = this.session.snapshot
    if (snap.status === 'authenticated') return of(this.router.createUrlTree(['/ctc/home']))
    if (snap.status === 'unauthenticated') return of(true)
    return this.session.loadMe().pipe(
      map((user) => (user ? this.router.createUrlTree(['/ctc/home']) : true))
    )
  }
}

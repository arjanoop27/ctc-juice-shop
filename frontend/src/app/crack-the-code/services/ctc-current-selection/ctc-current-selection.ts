import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {CtcApiResponse, CtcCurrentChallenge} from "../../models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CtcCurrentSelection {
  private readonly currentChallenge$ = new BehaviorSubject<CtcCurrentChallenge | null>(null)
  private readonly http = inject(HttpClient)
  private readonly base = environment.ctcBffServer + '/ctc/api'

  setCurrentChallenge(challenge: CtcCurrentChallenge): void {
    this.currentChallenge$.next(challenge)
    this.updateChallengeMetric(challenge.challengeId).subscribe();
  }

  clear(): void {
    this.currentChallenge$.next(null)
  }

  get snapshot(): CtcCurrentChallenge | null {
    return this.currentChallenge$.value
  }

  getCurrentChallenge$() {
    return this.currentChallenge$.asObservable()
  }

  private updateChallengeMetric(challengeId: string): Observable<boolean> {
    return this.http
      .post<CtcApiResponse>(this.base + '/metrics/challenge/' + challengeId.trim(), {})
      .pipe(
        map((res) => res.ok === true),
        catchError(() => of(false))
      );
  }
}

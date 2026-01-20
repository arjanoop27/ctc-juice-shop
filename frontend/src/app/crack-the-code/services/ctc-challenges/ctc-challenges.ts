import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CtcApiResponse, CtcChallenge} from "../../models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class CtcChallenges {
  private readonly http = inject(HttpClient)
  private readonly base = environment.ctcBffServer + '/ctc/api'

  getAllChallenges(): Observable<CtcChallenge[]> {
    return this.http
      .get<CtcApiResponse<CtcChallenge[]>>(this.base + '/challenges')
      .pipe(map(res => (res.ok && Array.isArray(res.data) ? res.data : [])))
  }
}

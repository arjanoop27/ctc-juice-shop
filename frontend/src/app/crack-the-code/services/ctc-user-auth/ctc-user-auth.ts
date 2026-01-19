import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {CtcApiResponse, LoginSuccessResponse, LoginUserRequest, RegisterUserRequest} from "../../models";

@Injectable({
  providedIn: 'root',
})
export class CtcUserAuth {
  private readonly http = inject(HttpClient);

  private readonly ctcBffServer = environment.ctcBffServer
  private readonly host = this.ctcBffServer + '/ctc/api/auth'

  login(payload: LoginUserRequest): Observable<string | null> {
    return this.http
      .post<CtcApiResponse<LoginSuccessResponse>>(this.host + '/login', payload)
      .pipe(
        map((res) => (res.ok ? res.data.token : null)),
        catchError(() => of(null))
      );
  }

  register(payload: RegisterUserRequest): Observable<boolean> {
    return this.http
      .post<CtcApiResponse>(this.host + '/register', payload)
      .pipe(
        map((res) => res.ok === true),
        catchError(() => of(false))
      );
  }
}

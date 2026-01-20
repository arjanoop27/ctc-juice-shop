import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http'
import { Observable, throwError, BehaviorSubject } from 'rxjs'
import { catchError, filter, switchMap, take } from 'rxjs/operators'
import { environment } from '../../../environments/environment'

@Injectable()
export class AuthRefreshInterceptor implements HttpInterceptor {
  private refreshing = false
  private refreshDone$ = new BehaviorSubject<boolean>(false)

  constructor (private http: HttpClient) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          if (this.isRefreshRequest(req)) {
            return throwError(() => err)
          }
          if (this.isAuthEndpoint(req)) {
            return throwError(() => err)
          }
          return this.handle401(req, next)
        }
        return throwError(() => err)
      })
    )
  }

  private handle401 (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshing) {
      this.refreshing = true
      this.refreshDone$.next(false)
      const refreshUrl = environment.ctcBffServer + '/ctc/api/auth/refresh'
      return this.http.post(refreshUrl, {}, { withCredentials: true }).pipe(
        switchMap(() => {
          this.refreshing = false
          this.refreshDone$.next(true)
          return next.handle(req)
        }),
        catchError((e) => {
          this.refreshing = false
          this.refreshDone$.next(false)
          return throwError(() => e)
        })
      )
    }

    return this.refreshDone$.pipe(
      filter(done => done === true),
      take(1),
      switchMap(() => next.handle(req))
    )
  }

  private isRefreshRequest (req: HttpRequest<any>): boolean {
    return req.url.includes('/ctc/api/auth/refresh')
  }

  private isAuthEndpoint (req: HttpRequest<any>): boolean {
    return (
      req.url.includes('/ctc/api/auth/login') ||
      req.url.includes('/ctc/api/auth/register')
    )
  }
}

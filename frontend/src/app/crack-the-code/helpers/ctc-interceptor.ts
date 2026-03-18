import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {CtcTokenStore} from "../services/ctc-token-store/ctc-token-store";

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  private readonly tokenStore = inject(CtcTokenStore)
  private readonly headerName = 'X-CTC-TOKEN'

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('ctc/api')) {
      return next.handle(req.clone({withCredentials: true}));
    } else {
      const token = this.tokenStore.snapshot
      if (!token) return next.handle(req)
      return next.handle(req.clone({
        setHeaders: {
          [this.headerName]: token
        }
      }));
    }
  }
}

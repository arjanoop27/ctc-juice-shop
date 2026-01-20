import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(req.url.includes('ctc/api')) {
      return next.handle(req.clone({ withCredentials: true }));
    }else{
      return next.handle(req);
    }
  }
}

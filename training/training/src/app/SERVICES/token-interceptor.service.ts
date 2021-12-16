import { HttpInterceptor } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private authService: AuthService) { }

  intercept(req: any, next: any){
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization : `${this.authService.getToken()}`
      }
    })

    return next.handle(tokenizeReq);

  }


}

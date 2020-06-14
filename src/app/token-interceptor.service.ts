import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import {AuthService} from './auth.service'
// yaah mai hum directly constructor mai nhi dalenge kyuki cyclic dependency error aajyega maybe abhi latest mai thk hogya hoga
// to hum injector ka use krenge
@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
// sabse pehle hume class implement krke intercept method bnana padhta hai
  constructor(private injector:Injector,
    private auth:AuthService) { }
  intercept(req,next){

    let authService=this.injector.get(AuthService);
    console.log(this.auth.getToken())
    let tokenizedReq=req.clone({
     setHeaders:{
      authorization:'Bearer '+authService.getToken()
     }
   })
    return next.handle(tokenizedReq)
  }
}

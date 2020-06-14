import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private registerUserUrl="http://localhost:3000/api/register"
   private loginUserUrl="http://localhost:3000/api/login"
   private profileUserUrl="http://localhost:3000/api/profile"
   private userData="http://localhost:3000/api/userData"
   private message = new BehaviorSubject('First Message');
  sharedMessage = this.message.asObservable();
  constructor(private http:HttpClient,private router:Router)
  {}

  registerUser(user){
    // to return observables basically res return krega jo api se aayega
   return this.http.post<any>(this.registerUserUrl,user)
  }
  loginUser(user){
    return this.http.post<any>(this.loginUserUrl,user)
  }
  loggedIn(){
    // return true / false
    return !! localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getProfile(user){
    return this.http.post<any>(this.profileUserUrl,user)
  }
  getData(data){
  return this.http.post<any>(this.userData,data) 
  }
  nextMessage(message:any){
   this.message.next(message)
 }
}

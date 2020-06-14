import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {AuthService} from '../auth.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,
    private _auth:AuthService,
    private router:Router) { }
  email:String;
  password:String
  loginUser={
    'email':this.email,
    'password':this.password
  }
  ngOnInit(): void {

  }
  login(){
   this._auth.loginUser(this.loginUser).subscribe((data)=>{
     console.log(data);
     localStorage.setItem('token',data.token)
     this.router.navigateByUrl('/profile')
   })
  }
}

import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {AuthService} from '../auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email:String;
  password:String
  registerUser={
    'email':this.email,
    'password':this.password
  }
  constructor(private _auth:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }
  signUp(){
    console.log(this.registerUser);
    this._auth.registerUser(this.registerUser).subscribe((data)=>{
  console.log(data);
  localStorage.setItem('token',data.token)
     this.router.navigateByUrl('/profile')

    });
  }
}

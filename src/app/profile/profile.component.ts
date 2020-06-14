import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import {AuthService} from '../auth.service'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Router} from '@angular/router'
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
 name:String='';
 address:String='';
 email:String='';
 phone:String='';
  userDetail={
    "name":this.name,
    "address":this.address,
    "email":this.email,
    "phone":this.phone
  }
  // @Output() msg=new EventEmitter<String>();
  constructor(private auth:AuthService,
    private http:HttpClient,
    private router:Router) { }


  ngOnInit() {
    console.log('hi')

        this.auth.getProfile(this.userDetail).subscribe(res=>{

      console.log(res)

    },err=>{
      if(err instanceof HttpErrorResponse){
        if(err.status===401){
          this.router.navigateByUrl('/login')
        }
      }
    })
  }

  submit(){
    this.auth.getProfile(this.userDetail).subscribe((data)=>{
      console.log(data);
      this.auth.nextMessage(data)
      // this.msg.emit(this.email)
         this.router.navigateByUrl('/dashboard')

        });
  }

}
